import axios from 'axios';
import { errorFromServer, successFromServer } from '../utils/toast';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addProject } from '../redux/slices/projectsSlice';
import { IProject, NewProject } from '../utils/types'

const BASEURL = "https://simplicity-server-3ad4.onrender.com/project/";


export default function UseProjects() {

    const dispatch: AppDispatch = useDispatch();


    // create project //
    const createProject = async (newProject: NewProject) => {
        try {
            const response = await axios.post(`${BASEURL}createProject`, newProject, { withCredentials: true });
            if (response.data.isSuccessful) {
                dispatch(addProject(response.data.data))
                successFromServer(response.data.displayMessage)
            }
        } catch (err) {
            if (axios.isAxiosError(err))
                errorFromServer(err.response?.data.displayMessage)
        }
    }

    //update project
    const updateProjects = async (updateProject: NewProject) => {
        try {
            const response = await axios.post(`${BASEURL}updateProject`, updateProject, { withCredentials: true });
            if (response.data.isSuccessful) {
                successFromServer(response.data.displayMessage);
            }
        } catch (err) {
            if (axios.isAxiosError(err))
                errorFromServer(err.response?.data.displayMessage)
        }
    }


    //get all projects
    const getAllProjects = async (setProjectList: React.Dispatch<React.SetStateAction<IProject[]>>) => {
        try {
            const response = await axios.get(`${BASEURL}getAllProjects`, { withCredentials: true });
            if (response.data.isSuccessful) {
                setProjectList(response.data.data)
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                errorFromServer(err.response?.data.displayMessage)
            }
            setProjectList([]);
        }
    }

    //delete project
    const deletProject = async (projectId: string) => {
        try {
            const response = await axios.post(`${BASEURL}deleteProject`, { projectId }, { withCredentials: true });
            if (response.data.isSuccessful) {
                successFromServer(response.data.displayMessage)

            }
        } catch (err) {
            if (axios.isAxiosError(err))
                errorFromServer(err.response?.data.displayMessage);
        }
    }


    return { createProject, updateProjects, getAllProjects, deletProject }
}











