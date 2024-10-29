import React, { useState } from 'react';
import validator from 'validator';
import axios from 'axios';
import { motion } from 'framer-motion';
import createUserImg from '../assets/create-user.png'
const CreateUser: React.FC = () => {
    interface User {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
    }

    const [user, setUser] = useState<User>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
    });

    const [phoneError, setPhoneError] = useState<string>('');
    const [errorCreateUser, setErrorCreateUser] = useState<string>('');
    const [successCreateUser, setSuccessCreateUser] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const isValidPhone = (phoneNumber: string): boolean => {
        return validator.isMobilePhone(phoneNumber, 'any');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser, [id]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setPhoneError(' ');
        setErrorCreateUser(' ');
        setSuccessCreateUser(' ');

        if (!isValidPhone(user.phone)) {
            setPhoneError("number is not valid");
            console.log("error");

            setTimeout(() => {
                setPhoneError('');
            }, 3000);
            return;
        }

        try {
            const response = await axios.post("https://simplicity-server-3ad4.onrender.com/api/createUser", user);
            setSuccessCreateUser("User created successfully!");
            console.log(response.data);

            setUser({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
            });
            setIsOpen(false);

            setTimeout(() => {
                setSuccessCreateUser('');
            }, 3000);

        } catch (errorCreateUser) {
            setErrorCreateUser("Failed to create user. Please try again.");
            console.error(errorCreateUser);

            setTimeout(() => {
                setErrorCreateUser('');
            }, 3000);

        }
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out hover:-translate hover:scale-105 text-[9px] custom-text-size"
            >
                Create user
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-lg sm:w-full w-[95%] max-w-md border border-gray-300 relative dark:text-white dark:bg-gray-800 mt-10"
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-1">Create Your Account</h1>

                            <div
                                className="absolute top-0 right-0 m-2 p-[1px] rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition transform duration-200 cursor-pointer"
                                onClick={() => { setIsOpen(false) }}
                            >
                                <svg
                                    className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>

                            <div className="flex items-center justify-center mb-2">
                                <img className='w-20 h-20' src={createUserImg} alt="" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 text-[12px]  dark:text-gray-100">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    pattern="^[\p{L}\s]+$"
                                    title="first name must contain only letters from any language"
                                    value={user.firstName}
                                    placeholder="Enter your first name"
                                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                    onChange={handleChange}
                                    required
                                    minLength={2}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 text-[12px]  dark:text-gray-100">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    pattern="^[\p{L}\s]+$"
                                    title="last name must contain only letters from any language"
                                    value={user.lastName}
                                    placeholder="Enter your last name"
                                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                    onChange={handleChange}
                                    required
                                    minLength={2}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-[12px]  dark:text-gray-100">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={user.email}
                                    placeholder="Enter your email"
                                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 text-[12px]  dark:text-gray-100">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={user.phone}
                                    placeholder="Enter your phone number"
                                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                    onChange={handleChange}
                                    required
                                />
                                {phoneError && <p className="text-red-500 text-xs italic">{phoneError}</p>}
                            </div>

                            <div className="mb-5">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-[12px]  dark:text-gray-100">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Password must contain at least 8 characters, with at least one uppercase letter, one lowercase letter, and one number"
                                    value={user.password}
                                    placeholder="Enter password"
                                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                    onChange={handleChange}
                                    required
                                    minLength={8}
                                />
                            </div>

                            {errorCreateUser && <p className="text-red-500 text-xs italic">{errorCreateUser}</p>}
                            {successCreateUser && <p className="text-green-500 text-xs italic">{successCreateUser}</p>}

                            <button
                                type="submit"
                                className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-md hover:from-blue-600 hover:to-purple-600 transition duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default CreateUser;
