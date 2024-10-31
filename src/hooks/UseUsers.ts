import axios from 'axios';
import { UserUpdate, Credentials, UserSignUp } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { errorFromServer, loginToast, successFromServer } from '../utils/toast';
import { addUser, initialUsers, removeUser, setUsers } from '../redux/slices/usersSlice';
export const BASEURL = "https://simplicity-server-3ad4.onrender.com/api/";


export default function UseUsers() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const updateUser = async (user: UserUpdate) => {
    try {
      const response = await axios.post(`${BASEURL}updateUser`, user, { withCredentials: true });
      if (response.data.isSuccessful) {
        successFromServer(response.data.displayMessage);
        dispatch(initialUsers());
      }
    } catch (err) {
      if (axios.isAxiosError(err))
        errorFromServer(err.response?.data.displayMessage)

      console.log(err);

    }
  };

  const searchUser = async (text: string) => {
    try {
      const response = await axios.get(`${BASEURL}searchUser/${text}`, { withCredentials: true });
      if (response.data.isSuccessful)
        dispatch(setUsers(response.data.data));
    } catch (err) {
      console.log(err);
      dispatch(setUsers([]));
    }
  }

  const loginByPassword = async (data: Credentials) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASEURL}login`, data, {
        withCredentials: true,
      });
      if (response.data.isSuccessful) {
        dispatch(login(response.data.data));
        loginToast()
        navigate('/users');
      }
    } catch (err) {
      if (axios.isAxiosError(err))
        errorFromServer(err.response?.data.displayMessage)
    }
    setLoading(false);
  }

  const loginWithGoogle = async (email: string) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BASEURL}loginWithGoogle`, { email }, {
        withCredentials: true,
      });
      if (response.data.isSuccessful) {
        dispatch(login(response.data.data));
        navigate('/users');
        loginToast();
      }
    } catch (err) {
      if (axios.isAxiosError(err))
        errorFromServer(err.response?.data.displayMessage)
    }
    setTimeout(() => {
      setLoading(false);
    }, 1500)
  };

  const createUser = async (user: UserSignUp) => {
    try {
      const response = await axios.post(`${BASEURL}createUser`, user, { withCredentials: true });
      if (response.data.isSuccessful) {
        dispatch(addUser(response.data.data))
        successFromServer(response.data.displayMessage)
      }
    } catch (err) {
      if (axios.isAxiosError(err))
        errorFromServer(err.response?.data.displayMessage)
    }
  }
  // Delete User //
  const deleteUser = async (email: string) => {
    try {
      const response = await axios.delete(`${BASEURL}deleteUser/${email}`, { withCredentials: true });
      if (response.data.isSuccessful) {
        successFromServer(response.data.displayMessage)
        dispatch(removeUser(email));
      }
    } catch (err) {
      if (axios.isAxiosError(err))
        errorFromServer(err.response?.data.displayMessage);
    }
  };


  // Logout //
  const logout = async (): Promise<void> => {
    try {
      const response = await axios.post(`${BASEURL}logout`, {}, { withCredentials: true });
      if (response.data.isSuccessful) {
        navigate(``);
        successFromServer(response.data.displayMessage);
      }
    } catch (err) {
      console.log('Failed to logout', err);
    }
  };


  return { updateUser, loginByPassword, searchUser, loginWithGoogle, createUser, deleteUser, logout, loading }
}







