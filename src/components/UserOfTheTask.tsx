import { useEffect, useState } from 'react';
import useTask from '../hooks/useTask';
import { IUser } from '../utils/types';
import Search from './Search';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { initialUsers } from '../redux/slices/usersSlice';
import { useSelector } from 'react-redux';

type Props = {
    taskId: string;
};

export default function UserOfTheTask({ taskId }: Props) {
    const { getUsersWithTask, assignTaskToUser } = useTask();
    const dispatch: AppDispatch = useDispatch();
    const usersList = useSelector((state: RootState) => state.users.users);

    const [users, setUsers] = useState<IUser[] | null>(null);
    const [editUsersOfTask, setEditUsersOfTask] = useState<boolean>(false);

    useEffect(() => {
        getUsersWithTask(taskId, setUsers);
        dispatch(initialUsers());
    }, [taskId]);

    const togglePopUp = () => {
        setEditUsersOfTask(!editUsersOfTask);
        dispatch(initialUsers());

    };



    return (
        <div className="flex cursor-pointer">
            {!users || users.length === 0 ? (
                <div
                    onClick={togglePopUp}
                    className="w-7 h-7 rounded-full flex justify-center items-center object-cover bg-gray-200">
                    👤
                </div>
            ) : (
                users.map((user, index) => (
                    <div
                        onClick={togglePopUp}
                        key={user._id}
                        className={`w-7 h-7 rounded-full object-cover border-[1px] border-gray-600 ${index !== 0 ? '-ml-3' : ''
                            }`}
                        style={{ position: 'relative', zIndex: users.length - index }}
                    >
                        {user.icon ? (
                            <img
                                className="w-7 h-7 rounded-full object-cover"
                                src={user.icon}
                                alt=""
                            />
                        ) : (
                            <div className="w-7 h-7 rounded-full flex justify-center items-center bg-gray-200">
                                👤
                            </div>
                        )}
                    </div>
                ))
            )}
            {editUsersOfTask && (
                <div className="flex h-[90%] sm:max-h-[60%] mt-7 items-center justify-center z-20 min-h-screen w-full bg-black bg-opacity-50 p-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-white px-6 py-2 rounded-lg shadow-lg w-full max-w-md border border-gray-300 relative dark:bg-gray-800 dark:text-white">
                        <div
                            className="absolute top-0 right-0 m-2 p-[1px] rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition transform duration-200 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                togglePopUp();
                            }}
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

                        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-5">
                            Task Users
                        </h1>

                        <div className="mb-6">
                            <h2 className="text-lg font-medium text-gray-700 mb-3">Assigned Users</h2>
                            {users && users.length > 0 ? (
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {users.map((user) => (
                                        <div
                                            key={user._id}
                                            className="flex items-center space-x-4 p-1 bg-gray-50 rounded-lg dark:bg-gray-800 dark:text-white border-[1px] mr-1"
                                        >
                                            <div className="flex-shrink-0">
                                                {user.icon ? (
                                                    <img
                                                        className="w-8 h-8 rounded-full object-cover"
                                                        src={user.icon}
                                                        alt={`${user.firstName} ${user.lastName}`}
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full flex justify-center items-center bg-gray-200">
                                                        👤
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0 dark:bg-gray-800 dark:text-white">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {user.firstName} {user.lastName}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-white">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <button
                                                className="border-[1px] rounded-md bg-red-400 p-1 hover:bg-red-500 transition transform duration-300"
                                                onClick={() => {
                                                    assignTaskToUser(user._id, taskId, setUsers);
                                                    togglePopUp();
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 mb-4">
                                    No users assigned to this task
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="mb-4">
                                <h2 className="text-lg font-medium text-gray-700 mb-3">Available Users</h2>
                                <div className="w-full mb-4">
                                    <Search />
                                </div>
                            </div>

                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {usersList?.map((user) => (
                                    <div
                                        key={user._id}
                                        className="flex items-center space-x-4 p-1 bg-gray-50 rounded-lg dark:bg-gray-800 dark:text-white border-[1px] mr-1"
                                    >
                                        <div className="flex-shrink-0">
                                            {user.icon ? (
                                                <img
                                                    className="w-8 h-8 rounded-full object-cover"
                                                    src={user.icon}
                                                    alt={`${user.firstName} ${user.lastName}`}
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full flex justify-center items-center bg-gray-200">
                                                    👤
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0 dark:bg-gray-800 dark:text-white">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {user.firstName} {user.lastName}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-white">
                                                {user.email}
                                            </p>
                                        </div>
                                        <button
                                            className="border-[1px] rounded-md bg-green-400 py-1 px-3 hover:bg-green-500 transition transform duration-300"
                                            onClick={() => {
                                                assignTaskToUser(user._id, taskId, setUsers);
                                                togglePopUp();
                                            }}
                                        >
                                            Add
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}