import Table from "../components/TableUsers";
import CreateUser from "./CreateUser";
import Search from "../components/Search";
import ButtonExport from "../components/ButtonExport";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { initialUsers } from "../redux/slices/usersSlice";
import { useSelector } from "react-redux";

export default function MainContent() {

    const dispatch: AppDispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users.users);

    useEffect(() => {
        dispatch(initialUsers());
    }, [])

    if (!users)
        return <p>loding...</p>

    return (
        <div className="w-full h-screen bg-gray-300 mt-9 sm:p-10 flex flex-col items-center dark:bg-gray-800">
            <div className="flex w-[80%] justify-end p-4 text-2xl font-bold text-gray-600 dark:text-white">{users.length} users active</div>
            <div className="w-[80%] flex items-center justify-between">
                <CreateUser />
                <div className="flex space-x-4 ml-2"><ButtonExport rout='/api/export' name={'Users'}/><Search /></div>
            </div>
            <Table users={users} />
        </div>
    )
}
