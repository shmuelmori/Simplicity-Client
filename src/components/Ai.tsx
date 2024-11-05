import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { runPrediction } from '../brain/brain';

export default function Ai() {
    const projectId = useSelector((state: RootState) => state.project.project);
    const [openAi, setOpenAi] = useState<boolean>(false);

    useEffect(() => {
        if (openAi) {
            runPrediction(projectId);
            setTimeout(() => {
                setOpenAi(false);
            }, 3000)
        }
    }, [openAi])


    return (
        <>
            <div className='absolute top-16 left-0 flex justify-end'>
                <motion.div
                    onClick={() => { setOpenAi(!openAi) }}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: openAi ? 0 : 720 }}
                    exit={{ rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    whileHover={{ scale: 1.1, rotate: openAi ? 0 : 360 }}
                    className={`ml-10 w-10 h-10 sm:w-16 sm:h-16 ${!openAi ? 'bg-gradient-to-r from-blue-300 via-purple-500 to-pink-500' : 'bg-gray-300'}
                 shadow-lg ${!openAi && 'shadow-blue-400'} rounded-full flex justify-center items-center text-2xl font-serif cursor-pointer z-[1000]`}
                >
                    AI
                </motion.div>
            </div>
        </>
    )
}