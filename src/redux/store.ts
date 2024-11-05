import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import usersReducer from './slices/usersSlice';
import themeReducer from './slices/themeSlice';
import projectsReducer from './slices/projectsSlice'
import tasksReduser from './slices/taskSlice'
import projectReduser from './slices/projectSlice'


export const store = configureStore({
    reducer: {
        user: userReducer,
        users: usersReducer,
        theme: themeReducer,
        projects: projectsReducer,
        tasks: tasksReduser,
        project: projectReduser
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
