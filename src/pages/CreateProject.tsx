import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { NewProject } from '../utils/types';

interface CreateProjectProps {
  onAddProject: (newProject: NewProject) => void;
  isOpen: boolean;
  onClose: () => void;
}

const CreateProject: React.FC<CreateProjectProps> = ({ onAddProject, isOpen, onClose }) => {
  const [project, setProject] = useState<NewProject>({
    name: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject, [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    onAddProject(project);
    setProject({ name: '', description: '' });
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm border
       border-gray-300 relative">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-5">Create New Project</h1>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 rounded-full bg-red-700 text-white cursor-pointer transition duration-200">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 text-left">Project Name</label>
          <input
            type="text"
            id="name"
            value={project.name}
            placeholder="Enter project name"
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2
             focus:ring-blue-500 transition duration-150 text-black bg-white"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700 text-left">Description</label>
          <textarea
            id="description"
            value={project.description}
            placeholder="Enter project description"
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2
             focus:ring-blue-500 transition duration-150 text-black bg-white"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-md hover:from-blue-600 hover:to-purple-600 transition duration-200">
          Submit
        </button>
      </form>
    </div>,
    document.body
  );
};

export default CreateProject;
