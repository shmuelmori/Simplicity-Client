import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";
import UseUsers from '../hooks/UseUsers';
import UseProjects from '../hooks/UseProjects';
import { IProject } from '../utils/types';
import SideBar2 from './SideBar2';
import logoImg from '../assets/logoSimplicity.webp'

interface SideProps {
  isOpen: boolean;
}

const Side: React.FC<SideProps> = ({ isOpen }) => {
  const [projectList, setProjectList] = useState<IProject[]>([]);
  const { getAllProjects } = UseProjects();
  const [viewProjects, setViewProjects] = useState(false);

  const handleProjectList = async () => {
    if (viewProjects) {
      setViewProjects(false);
      return;
    }

    // הגדר את viewProjects ל-true בכל לחיצה
    setViewProjects(true);
    // קבל את הפרויקטים, אך לא תמתין לתוצאה לפני פתיחת ה-SideBar2
    await getAllProjects(setProjectList);

  };

  // when you colse the nav, the project nav close to
  useEffect(() => {
    if (!isOpen)
      setViewProjects(false);
  }, [isOpen])

  const { logout } = UseUsers();


  return (
    <>
      {/* התפריט הראשי */}
      <aside
        className={`fixed top-0 right-0 z-50 w-[150px] h-full bg-black text-white p-4 transform transition-transform duration-300 ease-in-out flex flex-col justify-between ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ zIndex: 1000 }}
      >
        {/* לוגו */}
        <NavLink to="/about" className='relative flex justify-center items-center mb-6 mt-1'>
          <img
            src={logoImg}
            alt="Image"
            className='w-28 rounded-full' />
        </NavLink>

        {/* קישורים בפריסה עליונה */}
        <div className='flex flex-col items-center space-y-4 mt-4'>
          {/* פרויקט עם תיקייה */}
          <div className='hover:text-green-400 hover:border-green-400 border-b-2 flex items-center gap-2 hover:cursor-pointer'>
            <span onClick={handleProjectList}>Projects</span>
          </div>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive
                ? 'text-green-400 border-b-2 border-green-400'
                : 'hover:text-green-400 hover:border-b-2 hover:border-green-400 transition-colors duration-200'}
          >
            Users
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'text-green-400 border-b-2 border-green-400'
                : 'hover:text-green-400 hover:border-b-2 hover:border-green-400 transition-colors duration-200'}
          >
            About Us
          </NavLink>
        </div>

        {/* כפתור התנתקות בתחתית */}
        <div className='flex flex-col items-center mt-auto'>
          <h2 className='mb-4'>MSbit</h2>
          <button onClick={logout} className="text-xl hover:text-red-400 transition-colors duration-200">
            <TbLogout />
          </button>
        </div>
      </aside>

      {/* תפריט צד נוסף להציג את רשימת הפרויקטים */}
      {isOpen && <SideBar2 projectList={projectList} viewProjects={viewProjects} />}
    </>

  );
};

export default Side;
