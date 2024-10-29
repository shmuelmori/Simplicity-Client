import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../utils/types';
import axios from 'axios';

interface UserState {
    user: IUser | null;
}

const initialState: UserState = {
    user: null,
};

export const initialUser = createAsyncThunk('user/initialUser', async () => {
    try {
        const response = await axios.get("https://simplicity-server-3ad4.onrender.com/api/revalidate", {
            withCredentials: true
        });
        return response.data.data;
    } catch (error) {
        throw new Error(`Failed to fetch user data ${error}`);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(initialUser.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        });
        builder.addCase(initialUser.rejected, (state) => {
            state.user = null;
        });
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
