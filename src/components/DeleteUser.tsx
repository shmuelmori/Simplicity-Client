import UseUsers from "../hooks/UseUsers"
import { IUser } from "../utils/types"
import { motion } from 'framer-motion';
import garbageImg from '../assets/garbage.png'
type Prop = {
    setPopDeleteUser: React.Dispatch<React.SetStateAction<boolean>>,
    data: IUser
}
export default function DeleteUser({ setPopDeleteUser, data }: Prop) {

    const { deleteUser } = UseUsers();

    console.log(data);

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-black bg-opacity-50 p-4 fixed top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%]">
            <motion.div
                className="bg-white p-6 rounded-xl shadow-lg w-full max-w-[300px] border border-gray-300 relative dark:text-white dark:bg-gray-800"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div
                    className="absolute top-0 right-0 m-2 p-[1px] rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition transform duration-200 cursor-pointer"
                    onClick={() => { setPopDeleteUser(false) }}
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
                    <img src={garbageImg} alt="" />
                </div>

                <p className="font-semibold text-center text-gray-800 dark:text-white mb-3">Are you sure you want to DELETE this user?</p>
                <div className="text-gray-400 text-center w-full text-[12px] mb-2">{data.email}</div>

                <div className="flex w-full justify-center space-x-4">
                    <button
                        onClick={() => {
                            setPopDeleteUser(false);
                            deleteUser(data.email);
                        }}
                        className="bg-[#D5192F] px-6 py-1 rounded-lg hover:bg-red-700 text-white transition transform duration-300">
                        delete
                    </button>
                    <button
                        onClick={() => { setPopDeleteUser(false) }}
                        className="border-[1px] px-6 py-1 rounded-lg hover:bg-gray-200 text- transition transform duration-300">
                        cancel
                    </button>
                </div>
            </motion.div>
        </div >

    )
}
