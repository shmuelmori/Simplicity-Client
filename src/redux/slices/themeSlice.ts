import { createSlice } from '@reduxjs/toolkit';

type ThemeState = 'light' | 'dark';

const getInitialTheme = (): ThemeState => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState: getInitialTheme() as ThemeState,
    reducers: {
        toggleTheme: (state: ThemeState): ThemeState => {
            const newTheme = state === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
