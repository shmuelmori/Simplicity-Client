// SideBar2.tsx
import React, { useEffect, useState } from 'react';
import { NewProject, IProject } from '../utils/types';
import CreateProject from '../pages/CreateProject';
import UseProjects from '../hooks/UseProjects';
import { MdNavigateNext } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin7Line } from "react-icons/ri";
import Groups from '../components/Groups';
import DeleteProject from '../components/DeleteProject';
import UpdateProjects from '../components/UpdateProjects';
//import { setProject } from "../redux/slices/projectsSlice";
//import { useDispatch } from 'react-redux';

interface SideBar2Props {
  projectList: IProject[];
  viewProjects: boolean
}

const SideBar2: React.FC<SideBar2Props> = ({ projectList, viewProjects }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [popUpdate, setPopUpdate] = useState(false);
  const [data, setData] = useState(projectList[0]);
  //const dispatch = useDispatch();

  const [currentProjects, setCurrentProjects] = useState(projectList);


  useEffect(() => {
    setCurrentProjects(projectList);
  }, [projectList])

  const { createProject } = UseProjects();

  const handleToggleGroup = (projectId: string) => {
    setExpandedProjectId(prevId => prevId === projectId ? null : projectId);
  };

  const deleteProject = (project: IProject) => {
    setSelectedProject(project);
    setDeletePopUp(true);
  };

  const closeDeletePopup = () => {
    setDeletePopUp(false);
    setSelectedProject(null);
  };

  const handleUpdateProject = (project: IProject) => {
    setPopUpdate(true);
    setData(project);

  }

  //----------------------- drag -------------------------------

  const [draggedItem, setDraggedItem] = useState<IProject | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLElement>, project: IProject) => {
    setDraggedItem(project);
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLElement>) => {
    e.currentTarget.classList.remove('opacity-50');
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    const targetElement = e.currentTarget;
    targetElement.style.borderBottom = '2px solid blue';
  };

  const handleDragLive = (e: React.DragEvent<HTMLElement>) => {
    const targetElement = e.currentTarget;
    targetElement.style.borderBottom = '1px solid #F3F4F6';
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>, targetProject: IProject) => {
    e.preventDefault();

    if (!draggedItem || draggedItem._id === targetProject._id) return;

    const newProjects = [...currentProjects];
    const draggedIndex = currentProjects.findIndex(project => project._id === draggedItem._id);
    const targetIndex = currentProjects.findIndex(project => project._id === targetProject._id);

    newProjects.splice(draggedIndex, 1);
    newProjects.splice(targetIndex, 0, draggedItem);

    setCurrentProjects(newProjects);
    //dispatch(setProject(newProjects));

    const targetElement = e.currentTarget;
    targetElement.style.borderBottom = '1px solid #F3F4F6';
  };

  return (
    <aside
      className={`fixed top-14 z-20 -right-[300px] w-[210px] sm:w-[250px]  h-full bg-gray-700 text-white p-3 transform transition-transform duration-500 ease-in-out ${viewProjects ? 'translate-x-[-450px]' : ''
        }`}
      style={{ zIndex: 999 }}
    >
      <div className='flex justify-center items-center mb-4'>
        <div className='text-lg font-bold'>Project List</div>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 py-1 px-2 rounded"
        >
          +
        </button>
      </div>

      <ul className='space-y-2'>
        {currentProjects.length > 0 ? (
          currentProjects.map((project) => (
            <li
              key={project._id}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, project)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLive}
              onDrop={(e) => handleDrop(e, project)}
            >
              <div className='bg-gray-800 px-1 py-2 rounded-lg flex items-center justify-between hover:bg-gray-900 transition duration-200'>
                <span className='flex items-center'>
                  <span
                    className={`p-[2px] mr-1 hover:bg-slate-400 rounded-lg transition-transform duration-100 ${expandedProjectId === project._id ? 'rotate-90' : ''
                      }`}
                  >
                    <MdNavigateNext
                      onClick={() => handleToggleGroup(project._id)}
                      className="cursor-pointer"
                    />
                  </span>
                  {project.name}
                </span>
                <span className='flex items-center'>
                  <p className='p-[2px] mr-1 hover:bg-slate-400 rounded-lg transition duration-300'><LiaEdit onClick={() => handleUpdateProject(project)} /></p>
                  <p className='p-[2px] mr-1 hover:bg-slate-400 rounded-lg transition duration-300'>
                    <RiDeleteBin7Line
                      onClick={() => deleteProject(project)}
                    />
                  </p>
                </span>
              </div>
              {expandedProjectId === project._id && <Groups projectId={project._id} />}
            </li>
          ))
        ) : (
          <li className='bg-gray-700 p-2 rounded-lg'>No projects available.</li>
        )}
      </ul>

      <CreateProject
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onAddProject={(newProject: NewProject) => {
          createProject(newProject);
          setIsPopupOpen(false);
        }}
      />

      {deletePopUp && selectedProject && (
        <DeleteProject selectedProject={selectedProject} onClose={closeDeletePopup} />
      )}
      {popUpdate && (<UpdateProjects setPopUpdate={setPopUpdate} data={data} />)}
    </aside>
  );
};

export default SideBar2;
