import { useState } from 'react';
import loginImg from '../assets/login.jpg';
import signImg from '../assets/sign-in.jpg';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import ModeLight from '../components/ModeLight';

export default function Welcome() {
    const [showLogin, setShowLogin] = useState<boolean>(true);

    const handleSwitch = () => {
        setShowLogin(!showLogin);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#BED6D8] py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-800">
            <div className="max-w-[1200px] w-full grid md:grid-cols-5 gap-8">
                <>
                    <div className="bg-white dark:bg-gray-700 dark:text-white p-8 rounded-xl shadow-2xl col-span-2 lg:order-1 order-2 h-[550px] md:h-[450px]">
                        {showLogin ? <Login handleSwitch={handleSwitch} /> : <SignUp handleSwitch={handleSwitch} />}
                    </div>
                    <div className={`hidden md:block ${showLogin ? 'bg-gradient-to-r from-[#F6E5DE] via-[#F2B392] to-[#F48558]' : 'bg-gradient-to-r from-[#BEC2C3] via-[#EBECF0] to-[#D6DBDF]'} rounded-xl shadow-xl order-2 lg:order-1 h-[550px] md:h-[450px] col-span-3 `}>
                        <div className="h-full flex items-center justify-center">
                            <img src={`${showLogin ? loginImg : signImg}`} alt="Login illustration" className="w-[95%] rounded-xl" />
                        </div>
                    </div>
                </>
            </div>

            <div className='absolute top-2 left-2'>
                <ModeLight />
            </div>
        </div>
    );
}