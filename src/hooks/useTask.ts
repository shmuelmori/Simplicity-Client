import axios from 'axios';
import { errorFromServer, successFromServer } from '../utils/toast';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { addTask, removeTask, updateTask, setTasks } from '../redux/slices/taskSlice';
import { ITask, IUser } from '../utils/types';


type taskType = {
    name: string;
    description: string;
    status: "TO DO" | "IN PROGRESS" | "COMPLETE";
    duration: number;
    groupId: string;
};

type updateTaskDataType = {
    taskId: string,
    data: number | string,
    type: string
}

export default function useTask() {
    const BASEURL = "https://simplicity-server-3ad4.onrender.com/task/";

    const dispatch: AppDispatch = useDispatch();


    const createTask = async (newTask: taskType) => {
        try {
            const response = await axios.post(`${BASEURL}createTask`, newTask, { withCredentials: true })
            if (response.data.isSuccessful) {
                dispatch(addTask(response.data.data));
                successFromServer(response.data.displayMessage)
            }
        }
        catch (err) {
            if (axios.isAxiosError(err))
                errorFromServer(err.response?.data.displayMessage)
        }
    }

    const updateTaskGeneric = async (taskUpdate: updateTaskDataType) => {
        try {
            const response = await axios.post(`${BASEURL}updateTask`, taskUpdate, { withCredentials: true })
            if (response.data.isSuccessful) {
                dispatch(updateTask(response.data.data));
                successFromServer(response.data.displayMessage)
            }
        }
        catch (err) {
            if (axios.isAxiosError(err))
                errorFromServer(err.response?.data.displayMessage)
        }
    }

    const deleteTask = async (id: string) => {
        try {
            const response = await axios.post(`${BASEURL}deleteTask`, { id }, { withCredentials: true })
            if (response.data.isSuccessful) {
                dispatch(removeTask(response.data.data));
                successFromServer(response.data.displayMessage);
            }
        }
        catch (err) {
            if (axios.isAxiosError(err))
                errorFromServer(err.response?.data.displayMessage)
        }
    }

    const assignTaskToUser = async (userId: string, taskId: string, setUsers: React.Dispatch<React.SetStateAction<IUser[] | null>>) => {
        try {
            const response = await axios.post(`${BASEURL}assignTaskToUser`, { userId, taskId }, { withCredentials: true });
            if (response.data.isSuccessful) {
                successFromServer(response.data.displayMessage);
                if (response.data.data) {
                    setUsers(prevUsers => {
                        if (!prevUsers) {
                            return [response.data.data];
                        }
                        else {
                            const tempUsers = [...prevUsers!];
                            tempUsers.push(response.data.data);
                            return tempUsers;
                        }
                    });
                    return;
                }

                setUsers(prevUsers => prevUsers ? prevUsers.filter(user => user._id !== userId) : null);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                errorFromServer(err.response?.data.displayMessage);
            }
        }
    };


    const getTaskByUser = async (userId: string) => {
        try {
            const response = await axios.get(`${BASEURL}getTaskByUser/${userId}`, { withCredentials: true })
            if (response.data.isSuccessful) {
                response.data.data.forEach((task: ITask) => dispatch(addTask(task)));
                successFromServer(response.data.displayMessage);
            }
        } catch (err) {
            if (axios.isAxiosError(err))
                errorFromServer(err.response?.data.displayMessage);
        }
    }

    const getUsersWithTask = async (taskId: string, setUsers: React.Dispatch<React.SetStateAction<IUser[] | null>>) => {
        try {
            const response = await axios.get(`${BASEURL}usersWithTask/${taskId}`, { withCredentials: true });
            if (response.data.isSuccessful) {
                setUsers(response.data.data);
            }
        } catch (err) {
            if (axios.isAxiosError(err))
                console.log(err);

        }
    };

    // serach tasks
    const searchTask = async (text: string, id: string) => {
        try {
            const response = await axios.get(`${BASEURL}searchTask/${text}/${id}`, { withCredentials: true });
            if (response.data.isSuccessful) {
                dispatch(setTasks(response.data.data));
            }
        } catch (err) {
            console.error("Failed to search tasks:", err);
            dispatch(setTasks([]));
        }
    };


    return { createTask, updateTaskGeneric, deleteTask, assignTaskToUser, getTaskByUser, getUsersWithTask, searchTask }
}


