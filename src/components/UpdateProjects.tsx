import React, { useState } from 'react'
import { IProject } from '../utils/types';
import InputField from './InputField';
import UseProjects from '../hooks/UseProjects';
import ReactDOM from 'react-dom';

type Prop = {
    data: IProject,
    setPopUpdate:  (value: React.SetStateAction<boolean>) => void;
}

const UpdateProjects = ({data, setPopUpdate}:Prop) => {
    const { updateProjects } = UseProjects()
    const [project, setProject] = useState<IProject>({
        _id: data._id,
        name: data.name,
        description: data.description,
        icon: data.icon
    });
        
    const valid = (text: string) => {
        return text.length > 1 ;
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProject((prevProject) => ({...prevProject, name: e.target.value }));
    }

    const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProject((prevProject) => ({...prevProject, description: e.target.value }));
    }

    const handleChangeIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProject((prevProject) => ({...prevProject, icon: e.target.value }));
    }

    const handleSubmit = ()=> {
        updateProjects(project);
        setPopUpdate(false);
    }

  return ReactDOM.createPortal(
    <div className="flex items-center justify-center min-h-screen w-full bg-black bg-opacity-50 p-4 fixed top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%]">
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-300 relative">
      <div
        className="absolute top-0 right-0 m-2 p-1 rounded-full bg-red-700 text-white cursor-pointer"
        onClick={() => { setPopUpdate(false) }}
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-5">Update Project</h1>

      <div className="mb-4 text-black">
        <InputField
          id="Projectname"
          label="Project name"
          type="text"
          value={project.name}
          placeholder="Project name"
          isValid={valid}
          onChange={handleChangeName}
        />
      </div>

      <div className="mb-4  text-black">
        <InputField
          id="description111"
          label="description"
          type="text"
          value={project.description}
          placeholder="description"
          isValid={valid}
          onChange={handleChangeDescription}
        />
      </div>

      <div className="mb-4  text-black">
        <InputField
          id="icon111"
          label="icon"
          type="text"
          value={project.icon}
          placeholder="icon"
          isValid={()=>true}
          onChange={handleChangeIcon}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-md hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all duration-300"
      >
        Submit
      </button>
    </form>

  </div>,
  document.body
  );
}

export default UpdateProjects
