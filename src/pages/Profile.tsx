import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ITask, IUser } from '../utils/types';
import { FaEnvelope, FaPhone, FaCheckCircle, FaClock, FaTimesCircle, FaChartPie } from 'react-icons/fa';
import useTask from '../hooks/useTask';
import Loading from '../components/Loading';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const Profile = () => {
    const { getTasksByUser } = useTask();
    const user = useSelector((state: { user: { user: IUser } }) => state.user.user);
    const tasks = useSelector((state: { tasks: { tasks: ITask[] } }) => state.tasks.tasks);
    const [taskStats, setTaskStats] = useState({
        todo: 0,
        inProgress: 0,
        complete: 0
    });

    useEffect(() => {
        // Fetch tasks by ID using the Redux thunk for each task ID in workSpaceList
        if (user)
            getTasksByUser(user._id);
    }, [user]);

    useEffect(() => {
        const stats = tasks.reduce((acc, task) => {
            if (task.status === "TO DO") acc.todo++;
            else if (task.status === "IN PROGRESS") acc.inProgress++;
            else if (task.status === "COMPLETE") acc.complete++;
            return acc;
        }, { todo: 0, inProgress: 0, complete: 0 });

        setTaskStats(stats);
    }, [tasks]);

    const calculatePercentage = (value: number) => {
        const total = taskStats.todo + taskStats.inProgress + taskStats.complete;
        return total === 0 ? 0 : ((value / total) * 100).toFixed(1);
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className='scale-150'>
                    <Loading />
                </div>
            </div>
        );
    }


    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="container mx-auto px-4 py-8"
        >
            <motion.div
                variants={item}
                className="grid gap-6 md:grid-cols-2"
            >
                {/* Profile Header */}
                <motion.div
                    variants={item}
                    className="md:col-span-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
                >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative"
                        >
                            {user.icon ? (
                                <img
                                    src={user.icon}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-primary"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-2xl">
                                    {user.firstName[0]}{user.lastName[0]}
                                </div>
                            )}
                        </motion.div>
                        <div className="space-y-2 text-center md:text-left">
                            <motion.h1
                                className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                                variants={item}
                            >
                                {`${user.firstName} ${user.lastName}`}
                            </motion.h1>
                            <motion.div className="flex flex-col gap-2" variants={item}>
                                <div className="flex items-center gap-2 hover:text-primary transition-colors">
                                    <FaEnvelope className="w-4 h-4" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-2 hover:text-primary transition-colors">
                                    <FaPhone className="w-4 h-4" />
                                    <span>{user.phone}</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Task Statistics */}
                <motion.div variants={item}>
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 h-full">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <FaChartPie className="text-primary" />
                            Task Statistics
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div className="text-sm font-semibold">To Do</div>
                                    <div className="text-sm font-semibold">{calculatePercentage(taskStats.todo)}%</div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-100">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${calculatePercentage(taskStats.todo)}%` }}
                                        transition={{ duration: 1 }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                                    />
                                </div>
                            </div>
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div className="text-sm font-semibold">In Progress</div>
                                    <div className="text-sm font-semibold">{calculatePercentage(taskStats.inProgress)}%</div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${calculatePercentage(taskStats.inProgress)}%` }}
                                        transition={{ duration: 1 }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div className="text-sm font-semibold">Complete</div>
                                    <div className="text-sm font-semibold">{calculatePercentage(taskStats.complete)}%</div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${calculatePercentage(taskStats.complete)}%` }}
                                        transition={{ duration: 1 }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Task Summary */}
                <motion.div variants={item}>
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 h-full">
                        <h2 className="text-xl font-semibold mb-4">Task Overview</h2>
                        <motion.div className="grid gap-4" variants={container}>
                            <motion.div
                                variants={item}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center justify-between p-3 bg-red-100/80 rounded-lg hover:bg-red-100 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <FaTimesCircle className="text-red-500" />
                                    <span>To Do</span>
                                </div>
                                <span className="font-bold">{taskStats.todo}</span>
                            </motion.div>
                            <motion.div
                                variants={item}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center justify-between p-3 bg-blue-100/80 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <FaClock className="text-blue-500" />
                                    <span>In Progress</span>
                                </div>
                                <span className="font-bold">{taskStats.inProgress}</span>
                            </motion.div>
                            <motion.div
                                variants={item}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center justify-between p-3 bg-green-100/80 rounded-lg hover:bg-green-100 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-500" />
                                    <span>Complete</span>
                                </div>
                                <span className="font-bold">{taskStats.complete}</span>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Task List */}
                <motion.div variants={item} className="md:col-span-2">
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                        <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
                        <motion.div
                            className="grid gap-4"
                            variants={container}
                        >
                            {tasks.map((task) => (
                                <motion.div
                                    key={task._id}
                                    variants={item}
                                    whileHover={{ scale: 1.01 }}
                                    className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 bg-white"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold hover:text-primary transition-colors">
                                                {task.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">{task.description}</p>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${task.status === "TO DO"
                                                ? "bg-red-100 text-red-800"
                                                : task.status === "IN PROGRESS"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-green-100 text-green-800"
                                                }`}
                                        >
                                            {task.status}
                                        </span>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                                        <FaClock className="text-gray-400" />
                                        Duration: {task.duration} hours
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Profile;
