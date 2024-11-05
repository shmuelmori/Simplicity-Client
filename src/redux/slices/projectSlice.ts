import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectState {
    project: string | null;
}

const initialState: ProjectState = {
    project: localStorage.getItem('project') || null,
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProject: (state, action: PayloadAction<string | null>) => {
            state.project = action.payload;
            if (action.payload) {
                localStorage.setItem('project', action.payload);
            } else {
                localStorage.removeItem('project');
            }
        },
        clearProject: (state) => {
            state.project = null;
            localStorage.removeItem('project');
        },
    },
});

export const { setProject, clearProject } = projectSlice.actions;
export default projectSlice.reducer;
