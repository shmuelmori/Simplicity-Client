import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { toggleTheme } from "../redux/slices/themeSlice";
import darkmode from '../assets/dark-mode.png';
import lightmode from '../assets/light-mode.png';
import { motion } from 'framer-motion';

export default function ModeLight() {
    const theme = useSelector((state: RootState) => state.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <motion.button
            className="w-12 h-12"
            onClick={() => dispatch(toggleTheme())}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1, rotate: theme === 'dark' ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <img
                src={theme === 'dark' ? lightmode : darkmode}
                onError={(err) => {
                    console.log("faild to get image!", err);

                }} alt="mode icon" />
        </motion.button>
    );
}
