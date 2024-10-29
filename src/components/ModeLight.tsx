import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { toggleTheme } from "../redux/slices/themeSlice";
import darkmode from '../assets/dark-mode.png';
import lightmode from '../assets/light-mode.png';

export default function ModeLight() {
    const theme = useSelector((state: RootState) => state.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <button
            className='w-12 h-12'
            onClick={() => dispatch(toggleTheme())}
        >
            {/* Conditionally render the image based on the current theme */}
            <img src={theme === 'dark' ? lightmode : darkmode} alt="mode icon" />
        </button>
    )
}
