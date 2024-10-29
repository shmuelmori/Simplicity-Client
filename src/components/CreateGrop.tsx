import React, { useState } from 'react';
import InputField from './InputField';
import ReactDOM from 'react-dom';
import useGroup from '../hooks/useGroup';

type Props = {
    setCreateGroupPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
    projectId: string;
};

type groupType = {
    name: string;
    description: string;
    projectId: string;
};

export default function CreateGroup({ setCreateGroupPopupOpen, projectId }: Props) {
    const { createGroup } = useGroup();

    const [group, setGroup] = useState<groupType>({
        name: '',
        description: '',
        projectId,
    });

    const validInput = (text: string) => text.length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setGroup((prevGroup) => ({
            ...prevGroup,
            [id]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createGroup(group);
        setCreateGroupPopupOpen(false);
    };

    return ReactDOM.createPortal(
        <div className="flex items-center justify-center min-h-screen w-full bg-black bg-opacity-50 p-4 fixed top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%]">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-300 relative"
            >
                <div
                    className="absolute top-0 right-0 m-2 p-1 rounded-full bg-red-700 text-white cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => setCreateGroupPopupOpen(false)}
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

                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-5">Create Group</h1>

                <div className="mb-4">
                    <InputField
                        id="name"
                        label="Group Name"
                        type="text"
                        value={group.name}
                        placeholder="Group name"
                        isValid={validInput}
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
                        isValid={validInput}
                        onChange={handleChange}
                    />
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-md hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all duration-300"
                >
                    Submit
                </button>
            </form>
        </div>, document.body
    );
}
