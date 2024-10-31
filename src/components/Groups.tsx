import { useEffect, useState } from "react";
import { IGroup, UpdateGroupType } from '../utils/types';
import useGroup from "../hooks/useGroup";
import { motion } from "framer-motion";
import SingleGroup from "./SingleGroup";
import UpdateGroup from "./UpdateGroup";
import CreateGroup from "./CreateGrop";
import DeleteGroup from "./DeleteGroup";

type Props = {
    projectId: string;
}

export default function Groups({ projectId }: Props) {
    const { getGroupsByProject, updateGroup, deleteGroup } = useGroup();
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
    const [isCreateGroupPopupOpen, setCreateGroupPopupOpen] = useState(false);
    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);

    // קטע זה טוען את הקבוצות כאשר הרכיב נטען או כאשר projectId משתנה
    useEffect(() => {
        const fetchGroups = async () => {
            await getGroupsByProject(setGroups, projectId);
        };
        fetchGroups();
    }, [projectId]);

    // פונקציה לטיפול בעריכת קבוצה
    const handleEditGroup = (groupId: string) => {
        const groupToEdit = groups.find(group => group._id === groupId);
        if (groupToEdit) {
            setSelectedGroup(groupToEdit);
            setUpdatePopupOpen(true);
        }
    };

    // פונקציה לטיפול במחיקת קבוצה
    const handleDeleteGroup = (groupId: string) => {
        const groupToDelete = groups.find(group => group._id === groupId);
        if (groupToDelete) {
            setSelectedGroup(groupToDelete);
            setDeletePopupOpen(true);
        }
    };

    // פונקציה לעדכון קבוצה
    const handleUpdateGroup = async (updatedGroup: UpdateGroupType) => {
        await updateGroup(updatedGroup);
        setUpdatePopupOpen(false);
        await getGroupsByProject(setGroups, projectId);
    };

    // פונקציה לאישור מחיקת קבוצה
    const handleConfirmDeleteGroup = async () => {
        if (selectedGroup) {
            await deleteGroup(selectedGroup._id); // קריאה למחיקת הקבוצה
            setDeletePopupOpen(false);
            setSelectedGroup(null);
            await getGroupsByProject(setGroups, projectId); // רענון הקבוצות מהשרת
        }
    };

    return (
        <div className="ml-3">
            {groups.length > 0 ? (
                groups.map((group, index) => (
                    <motion.div
                        key={group._id}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 * index }}
                    >
                        <SingleGroup
                            group={group}
                            onEdit={() => handleEditGroup(group._id)}
                            onDelete={() => handleDeleteGroup(group._id)}
                        />
                    </motion.div>
                ))
            ) : (
                <div className="text-gray-500 text-center py-4">No Groups available.</div>
            )}
            <div className='flex justify-center items-center mb-4 mt-2'>
                <div className='text-lg font-bold'>Add group</div>
                <button
                    onClick={() => setCreateGroupPopupOpen(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold
                     ml-2 py-1 px-2 rounded transition transform duration-300"
                >
                    +
                </button>
            </div>

            {isUpdatePopupOpen && selectedGroup && (
                <UpdateGroup
                    setPopUpdateGroup={setUpdatePopupOpen}
                    data={selectedGroup}
                    onUpdate={handleUpdateGroup}
                />
            )}
            {isCreateGroupPopupOpen && (
                <CreateGroup
                    setCreateGroupPopupOpen={setCreateGroupPopupOpen}
                    projectId={projectId}
                />
            )}
            {isDeletePopupOpen && selectedGroup && (
                <DeleteGroup
                    selectedGroup={selectedGroup}
                    onConfirmDelete={handleConfirmDeleteGroup}
                    onClose={() => setDeletePopupOpen(false)}
                />
            )}
        </div>
    );
}
