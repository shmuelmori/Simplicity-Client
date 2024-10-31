import React from 'react';
import { IProject } from '../utils/types';
import UseProjects from '../hooks/UseProjects';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import garbageImg from '../assets/garbage.png'

interface DeleteProjectProps {
  selectedProject: IProject;
  onClose: () => void;
}

const DeleteProject: React.FC<DeleteProjectProps> = ({ selectedProject, onClose }) => {
  const { _id } = selectedProject;
  const { deletProject } = UseProjects();

  const handleDelete = async () => {
    try {
      await deletProject(_id);  // ניסיון למחוק את הפרויקט
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      onClose();  // סגירת הפופ-אפ בכל מקרה
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-[300px] border border-gray-300 relative dark:text-white dark:bg-gray-800"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-5 dark:bg-gray-800 dark:text-white">Delete Project</h1>

        <div
          className="absolute top-0 right-0 m-2 p-[1px] rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition transform duration-200 cursor-pointer"
          onClick={onClose}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <div className="flex items-center justify-center mb-2">
          <img src={garbageImg} alt="" />
        </div>

        <p className="font-semibold text-center text-gray-800 mb-5 dark:bg-gray-800 dark:text-white">
          Are you sure you want to DELETE
          <span className="text-gray-600"> {selectedProject.name}</span> ?
        </p>
        <div className="flex w-full justify-center space-x-4">
          <button
            onClick={handleDelete}
            className="bg-[#D5192F] px-6 py-1 rounded-lg hover:bg-red-700 text-white transition transform duration-300">
            delete
          </button>
          <button
            onClick={onClose}
            className="border-[1px] px-6 py-1 rounded-lg hover:bg-gray-200 text- transition transform duration-300">
            cancel
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default DeleteProject;
