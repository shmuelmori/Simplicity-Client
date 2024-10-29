import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ITask } from '../../utils/types';

interface taskState {
    tasks: ITask[];
}

const initialState: taskState = {
    tasks: [],
};

export const initialTasks = createAsyncThunk('tasks/initialTask', async (groupId: string) => {
    try {
        const response = await axios.get(`https://simplicity-server-3ad4.onrender.com/task/getTaskByGroup/${groupId}`, {
            withCredentials: true
        });
        return response.data.data;
    } catch (error) {
        throw new Error(`Failed to fetch user data ${error}`);
    }
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<ITask>) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action: PayloadAction<ITask>) => {
            const index = state.tasks.findIndex((task: ITask) => task._id === action.payload._id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        removeTask: (state, action: PayloadAction<ITask>) => {
            const index = state.tasks.findIndex((task: ITask) => task._id === action.payload._id);
            if (index !== -1) {
                state.tasks.splice(index, 1);
            }
        },
        setTasks: (state, action: PayloadAction<ITask[]>) => {
            state.tasks = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(initialTasks.fulfilled, (state, action: PayloadAction<ITask[]>) => {
            state.tasks = action.payload;
        });
        builder.addCase(initialTasks.rejected, (state) => {
            state.tasks = [];
        });
    },
});

export const { addTask, updateTask, removeTask, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
