import { NavLink } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { LiaCopyrightSolid } from 'react-icons/lia';

type Prop = {
  isAsideOpen: boolean;
}

const Footer = ({ isAsideOpen }: Prop) => {
  return (
    <footer className='bg-gray-100 text-black flex flex-col sm:flex-row justify-between items-center p-6 sm:p-4 w-full shadow-md'>
      <div className='flex flex-col sm:flex-row gap-3 items-center'>
        <h2>MSbit Software</h2>
        <NavLink to="" className='hover:underline'>Analytics</NavLink>
        <NavLink className='flex items-center gap-2 hover:underline' to="">
          Website <FaExternalLinkAlt />
        </NavLink>
      </div>
      <h3 className={`text-sm flex gap-2 items-center mt-4 sm:mt-0 transition-transform duration-500 ease-in-out
         ${isAsideOpen ? 'mr-[150px]' : 'mr-0'}`}>
        Simplicity <LiaCopyrightSolid /> 2024
      </h3>
    </footer>
  );
}

export default Footer;


