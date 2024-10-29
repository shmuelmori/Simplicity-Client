import { IProject } from '../../utils/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


interface ProjectState {
    projects: IProject[];
}

const initialState: ProjectState = {
    projects: [],
};



export const initialProjects = createAsyncThunk<IProject[], void>('projects/initialProjects', async () => {
    try {
        const response = await axios.get(`https://simplicity-server-3ad4.onrender.com/project/getAllProjects`, { withCredentials: true });
        if (response.data.isSuccessful)
            return response.data.data;
    } catch (err) {
        if (axios.isAxiosError(err))
            return [];
        return [];
    }
});


const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action: PayloadAction<IProject>) => {
            state.projects.push(action.payload);
        },
        removeProject: (state, action: PayloadAction<string>) => {
            state.projects = state.projects.filter(project => project.name !== action.payload);
        },
        updateProject: (state, action: PayloadAction<IProject>) => {
            const index = state.projects.findIndex(project => project._id === action.payload._id);
            if (index !== -1) {
                state.projects[index] = action.payload;
            }
        },
        setProject: (state, action: PayloadAction<IProject[]>) => {
            state.projects = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(initialProjects.fulfilled, (state, action: PayloadAction<IProject[]>) => {
            state.projects = action.payload;
        });
        builder.addCase(initialProjects.rejected, (state) => {
            state.projects = [];
        });
    },
});

export const { addProject, removeProject, updateProject, setProject } = projectsSlice.actions;
export default projectsSlice.reducer;