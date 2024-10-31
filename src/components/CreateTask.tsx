import { useState } from "react";
import InputField from "./InputField";
import useTask from "../hooks/useTask";
import { motion } from 'framer-motion';
import createImg from '../assets/create-pro-gro.png'


type Prop = {
  groupId: string;
  setPopCreateTask: React.Dispatch<React.SetStateAction<boolean>>;
};

type taskType = {
  name: string;
  description: string;
  status: "TO DO" | "IN PROGRESS" | "COMPLETE";
  duration: number;
  groupId: string;
};

export default function CreateTask({ groupId, setPopCreateTask }: Prop) {

  const { createTask } = useTask()
  const [task, setTask] = useState<taskType>({
    name: "",
    description: "",
    duration: 0,
    groupId: groupId,
    status: "TO DO",
  });

  const validInput = (text: string) => {
    return text.length > 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [id]: id === "duration" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createTask(task);
    setPopCreateTask(false);
  };

  return (
    <div className="flex items-center z-20 justify-center min-h-screen w-full bg-black bg-opacity-50 p-4 fixed top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%]">
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-[300px] border border-gray-300 relative dark:text-white dark:bg-gray-800"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <form onSubmit={handleSubmit}>
          <div
            className="absolute top-0 right-0 m-2 p-[1px] rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition transform duration-200 cursor-pointer"
            onClick={() => { setPopCreateTask(false) }}
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

          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-5 dark:text-white">Create Task</h1>

          <div className="flex items-center justify-center mb-2">
            <img src={createImg} alt="" />
          </div>

          <div className="mb-4">
            <InputField
              id="name"
              label="Task Name"
              type="text"
              value={task.name}
              placeholder="Task name"
              isValid={validInput}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <InputField
              id="description"
              label="Description"
              type="text"
              value={task.description}
              placeholder="Description"
              isValid={validInput}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <InputField
              id="duration"
              label="Duration"
              type="number"
              value={task.duration.toString()}
              placeholder="Duration in hours"
              isValid={validInput}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-md hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
}
