import axios from 'axios';
import { errorFromServer, successFromServer } from '../utils/toast';
import { IGroup, UpdateGroupType } from '../utils/types';

const BASEURL = "https://simplicity-server-3ad4.onrender.com/group/";

type groupType = {
    name: string;
    description: string;
    projectId: string;
};

export default function useGroup() {

    const getGroupsByProject = async (setGroup: React.Dispatch<React.SetStateAction<IGroup[]>>, _id: string) => {
        try {
            const response = await axios(`${BASEURL}getGroupsByProject/${_id}`, { withCredentials: true })
            if (response.data.isSuccessful)
                setGroup(response.data.data);
        } catch (err) {
            if (axios.isAxiosError(err))
                errorFromServer(err.response?.data.displayMessage)
            setGroup([]);
        }
    }

    // Update Group //
    const updateGroup = async (group: UpdateGroupType) => {
        try {
            const response = await axios.patch(`${BASEURL}updateGroup/${group._id}`, group, { withCredentials: true });
            if (response.data.isSuccessful) {
                successFromServer(response.data.displayMessage);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                errorFromServer(err.response?.data.displayMessage);
            }
        }
    }
    // Create Group //
    const createGroup = async (newGroup: groupType) => {
        try {
            const response = await axios.post(`${BASEURL}createGroup`, newGroup, { withCredentials: true });
            if (response.data.isSuccessful) {
                successFromServer(response.data.displayMessage);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                errorFromServer(err.response?.data.displayMessage);
            }
        }
    }

    // Delete group //
    const deleteGroup = async (_id: string) => {
        try {
            const response = await axios.delete(`${BASEURL}deleteGroup/${_id}`, { withCredentials: true });
            console.log(100);
            if (response.data.isSuccessful) {
                successFromServer(response.data.displayMessage);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                errorFromServer(err.response?.data.displayMessage);
            }
        }
    }


    return { getGroupsByProject, updateGroup, createGroup, deleteGroup }
}


