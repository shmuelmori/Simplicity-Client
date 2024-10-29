import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../utils/types';
import axios from 'axios';
interface UsersState {
    users: IUser[];
}

const initialState: UsersState = {
    users: [],
};



export const initialUsers = createAsyncThunk('users/initialUsers', async () => {
    try {
        const response = await axios.get(`https://simplicity-server-3ad4.onrender.com/api/getAllUsers`, { withCredentials: true });
        if (response.data.isSuccessful)
            return response.data.data;
    } catch (err) {
        if (axios.isAxiosError(err))
            return [];
        return [];
    }
});


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<IUser>) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(user => user.email !== action.payload);
        },
        updateUser: (state, action: PayloadAction<IUser>) => {
            const index = state.users.findIndex(user => user._id === action.payload._id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        setUsers: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(initialUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload;
        });
        builder.addCase(initialUsers.rejected, (state) => {
            state.users = [];
        });
    },
});

export const { addUser, removeUser, updateUser, setUsers } = usersSlice.actions;
export default usersSlice.reducer;
