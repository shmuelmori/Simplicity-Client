import { ITask } from "../utils/types";
import { RiDraggable } from "react-icons/ri";
import { BsHourglass } from "react-icons/bs";
import { useEffect, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegDotCircle } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import useTask from "../hooks/useTask";
import { setTasks } from "../redux/slices/taskSlice";
import { useDispatch } from "react-redux";
import UserOfTheTask from "./UserOfTheTask";



type Prop = {
    tasks: ITask[];
};

const statusOptions = ["TO DO", "IN PROGRESS", "COMPLETE"];

export default function TableTask({ tasks }: Prop) {
    const dispatch = useDispatch();
    const { updateTaskGeneric, deleteTask } = useTask();
    const [activePopup, setActivePopup] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<string>("");

    useEffect(() => {
        if (activePopup === null) {
            setEditValue("");
        }
    }, [activePopup]);

    const handleStatusChange = (taskId: string, newStatus: string) => {
        setActivePopup(null);

        const taskToUpdate = {
            taskId: taskId,
            data: newStatus,
            type: "status"
        }
        updateTaskGeneric(taskToUpdate);
    };

    const handleNameChange = (taskId: string) => {
        setActivePopup(null);

        const taskToUpdate = {
            taskId: taskId,
            data: editValue,
            type: "name"
        }
        updateTaskGeneric(taskToUpdate);
    };

    const handleDurationChange = (taskId: string) => {
        setActivePopup(null);

        const taskToUpdate = {
            taskId: taskId,
            data: editValue,
            type: "duration"
        }
        updateTaskGeneric(taskToUpdate);
    };

    const handleDescriptionChange = (taskId: string) => {
        setActivePopup(null);

        const taskToUpdate = {
            taskId: taskId,
            data: editValue,
            type: "description"
        }
        updateTaskGeneric(taskToUpdate);
    };

    const handeleDelete = (deleteId: string) => {
        deleteTask(deleteId);
    }


    const renderEditPopup = (
        taskId: string,
        currentValue: string,
        onSave: (taskId: string) => void,
        inputType: string = "text"
    ) => (
        <div className={`absolute top-0 left-1/2 z-10 bg-white dark:text-black border rounded-md shadow-lg p-2 transform -translate-x-[50%] ${inputType !== 'number' && 'w-[150px]'}`}>
            <input
                type={inputType}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="border rounded px-2 py-1 w-full"
                autoFocus
            />
            <div className="mt-2 flex justify-end space-x-2">
                <button
                    onClick={() => onSave(taskId)}
                    className="bg-blue-500 text-white px-2 py-1 rounded transition transform duration-300 hover:bg-blue-700"
                >
                    Save
                </button>
                <button
                    onClick={() => setActivePopup(null)}
                    className="bg-gray-500 text-white px-2 py-1 rounded transition transform duration-300 hover:bg-gray-700"
                >
                    Cancel
                </button>
            </div>
        </div>
    );

    //----------------------- drag -------------------------------

    const [draggedItem, setDraggedItem] = useState<ITask | null>(null);

    // Handle Drag Start
    const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, task: ITask) => {
        setDraggedItem(task);
        e.currentTarget.classList.add('opacity-50');
    };

    // Handle Drag End
    const handleDragEnd = (e: React.DragEvent<HTMLTableRowElement>) => {
        e.currentTarget.classList.remove('opacity-50');
        setDraggedItem(null);
    };

    // Handle Drag Over
    const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
        e.preventDefault();
        const targetElement = e.currentTarget;
        targetElement.style.borderBottom = '2px solid blue';
    };

    // Handle Drag Leave
    const handleDragLive = (e: React.DragEvent<HTMLTableRowElement>) => {
        const targetElement = e.currentTarget;
        targetElement.style.borderBottom = '1px solid #F3F4F6';
    };

    // Handle Drop
    const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, targetTask: ITask) => {
        e.preventDefault();

        if (!draggedItem || draggedItem._id === targetTask._id) return;

        const newTasks = [...tasks];
        const draggedIndex = tasks.findIndex(task => task._id === draggedItem._id);
        const targetIndex = tasks.findIndex(task => task._id === targetTask._id);

        newTasks.splice(draggedIndex, 1);
        newTasks.splice(targetIndex, 0, draggedItem);

        dispatch(setTasks(newTasks));
        const targetElement = e.currentTarget;
        targetElement.style.borderBottom = '1px solid #F3F4F6';
    };

    // Touch Event Handlers
    const handleTouchStart = (e: React.TouchEvent<HTMLTableRowElement>, task: ITask) => {
        handleDragStart(e as any, task); // Cast for compatibility
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLTableRowElement>) => {
        // This can be used to provide visual feedback on mobile if needed.
        e.preventDefault();
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLTableRowElement>, targetTask: ITask) => {
        handleDrop(e as any, targetTask); // Cast for compatibility
        setDraggedItem(null); // Reset dragged item
    };

    // Render
    return (
        <div className="w-[90%] overflow-x-auto mt-2">
            <table className="min-w-[400px] w-[99%] sm:w-[90%] overflow-x-auto border-spacing-y-2 text-[15px]">
                <thead>
                    <tr className="bg-white dark:bg-gray-800 dark:text-white border-b-[1px] text-[15px] text-left text-gray-400 font-extralight">
                        <th className="p-2">Name</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Duration</th>
                        <th className="p-2">Description</th>
                        <th className="p-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr
                            key={task._id}
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, task)}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLive}
                            onDrop={(e) => handleDrop(e, task)}
                            onTouchStart={(e) => handleTouchStart(e, task)}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={(e) => handleTouchEnd(e, task)}
                            className="text-[13px] transition-transform duration-300 ease-in-out border-b-[1px] bg-white hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                        >
                            <td className="px-2 min-w-[200px] py-2 flex items-center space-x-2 font-s relative">
                                {activePopup === task._id + "_name" &&
                                    renderEditPopup(task._id, task.name, handleNameChange, "text")}
                                <RiDraggable className="text-2xl cursor-move" />
                                <span className="bg-transparent">
                                    {task.status === "COMPLETE" ? (
                                        <span className="text-[#2fb170] text-lg">
                                            <FaRegCircleCheck />
                                        </span>
                                    ) : (
                                        <span
                                            className={`${task.status === "IN PROGRESS" ? "text-[#5A51E2]" : "bg-[#DCDEE1] text-gray-400"
                                                }`}
                                        >
                                            <FaRegDotCircle size={17} />
                                        </span>
                                    )}
                                </span>
                                <span className="w-full flex">{task.name}</span>
                                <UserOfTheTask taskId={task._id} />
                                <span
                                    className="flex justify-end border-[1px] p-1 rounded-md bg-white cursor-pointer dark:text-white"
                                    onClick={() => {
                                        setActivePopup(task._id + "_name");
                                        setEditValue(task.name);
                                    }}
                                >
                                    <CiEdit className=" dark:text-black" title="Rename" />
                                </span>
                            </td>

                            <td className="px-2 py-1 relative min-w-[150px]">
                                {activePopup === task._id + "_status" ? (
                                    <div className="bg-white border rounded-md shadow-lg">
                                        {statusOptions.map((status) => (
                                            <div
                                                key={status}
                                                className={`px-4 py-2 cursor-pointer dark:bg-gray-600 transition transform duration-300 ${status === "COMPLETE"
                                                    ? "hover:bg-[#008141] hover:text-white dark:hover:bg-[#008141] dark:hover:text-white"
                                                    : status === "TO DO"
                                                        ? "hover:bg-[#DCDEE1] hover:text-gray-700 dark:hover:bg-[#DCDEE1] dark:hover:text-gray-700"
                                                        : "hover:bg-[#5A51E2] hover:text-white dark:hover:bg-[#5A51E2] dark:hover:text-white"
                                                    }`}
                                                onClick={() => handleStatusChange(task._id, status)}
                                            >
                                                {status}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <span
                                        title="Edit"
                                        onClick={() => setActivePopup(task._id + "_status")}
                                        className={`inline-block px-2 py-1 rounded-md text-[13px] font-semibold cursor-pointer ${task.status === "COMPLETE"
                                            ? "bg-[#008141] text-white"
                                            : task.status === "TO DO"
                                                ? "bg-[#DCDEE1] text-gray-700"
                                                : "bg-[#5A51E2] text-white"
                                            }`}
                                    >
                                        {task.status}
                                    </span>
                                )}
                            </td>

                            <td className="px-2 py-1 relative">
                                <span
                                    onClick={() => {
                                        setActivePopup(task._id + "_duration");
                                        setEditValue(task.duration.toString());
                                    }}
                                    className="flex items-center cursor-pointer"
                                >
                                    <BsHourglass title="Edit" className="mr-1" />
                                    {task.duration}
                                </span>
                                {activePopup === task._id + "_duration" &&
                                    renderEditPopup(task._id, task.duration.toString(), handleDurationChange, "number")}
                            </td>

                            <td className="px-2 py-1 relative min-w-[150px]">
                                <span
                                    title="Edit"
                                    onClick={() => {
                                        setActivePopup(task._id + "_description");
                                        setEditValue(task.description);
                                    }}
                                    className="cursor-pointer"
                                >
                                    {task.description}
                                </span>
                                {activePopup === task._id + "_description" &&
                                    renderEditPopup(task._id, task.description, handleDescriptionChange, "text")}
                            </td>

                            <td className="px-2 py-1">
                                <span

                                    className="inline-block border-[1px] p-1 rounded-md bg-white cursor-pointer dark:text-black">
                                    <RiDeleteBin7Line onClick={() => { handeleDelete(task._id) }}
                                        title="Delete" />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            { }
        </div>
    );
}