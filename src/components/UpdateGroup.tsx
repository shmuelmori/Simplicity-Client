import React, { useState, useEffect } from 'react';
import { IGroup, UpdateGroupType } from '../utils/types';
import { validGroupName, validDescription } from '../utils/helper';
import InputField from './InputField';
import useGroup from '../hooks/useGroup';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

type Prop = {
  setPopUpdateGroup: (value: React.SetStateAction<boolean>) => void;
  data: IGroup;
  onUpdate: (updatedGroup: UpdateGroupType) => void;
}

const UpdateGroup = ({ setPopUpdateGroup, data, onUpdate }: Prop) => {
  const { updateGroup } = useGroup();
  const [group, setGroup] = useState<UpdateGroupType>({ name: '', description: '', _id: '' });
  const [error, setError] = useState<string | null>(null); // טיפול בשגיאות

  useEffect(() => {
    setGroup({ name: data.name, description: data.description, _id: data._id });
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setGroup(prevGroup => ({ ...prevGroup, [id]: value }));
    setError(null); // נקה שגיאות כאשר המשתמש עורך
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validGroupName(group.name) || !validDescription(group.description)) {
      setError("Invalid input. Please check your fields."); // הודעת שגיאה
      return;
    }

    try {
      await updateGroup(group);
      onUpdate(group);
      setPopUpdateGroup(false);
    } catch (error) {
      console.error("Error updating group:", error);
      setError("Failed to update group. Please try again."); // טיפול בשגיאות
    }
  };

  return ReactDOM.createPortal(
    <div className="flex items-center z-[1000] justify-center min-h-screen w-full bg-black bg-opacity-50 p-4 fixed top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%]">
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-[300px] border border-gray-300 relative dark:text-white dark:bg-gray-800"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <form onSubmit={handleSubmit}>
          <div
            className="absolute top-0 right-0 m-2 p-[1px] rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition transform duration-200 cursor-pointer"
            onClick={() => { setPopUpdateGroup(false) }}
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

          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-5 dark:text-white dark:bg-gray-800">Update Group</h1>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* הצגת הודעת שגיאה */}

          <div className="mb-4">
            <InputField
              id="name"
              label="Group Name"
              type="text"
              value={group.name}
              placeholder="Group name"
              isValid={validGroupName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <InputField
              id="description"
              label="Description"
              type="text"
              value={group.description}
              placeholder="Description"
              isValid={validDescription}
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
    </div>,
    document.body
  );
};

export default UpdateGroup;
