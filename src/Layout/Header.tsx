import { LuMenu } from 'react-icons/lu';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import ModeLight from '../components/ModeLight';

type HeaderProps = {
  toggleAside: () => void;
  isAsideOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleAside, isAsideOpen }: HeaderProps) => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <header className="bg-gray-800 px-2 py-1 text-white flex justify-between items-center fixed top-0 w-full shadow-md z-30">
      <ModeLight />
      <p className='p-2'>{user?.firstName}</p>
      <button
        onClick={toggleAside}
        className={`flex items-center justify-center w-12 h-8 border-2 border-gray-400 rounded-lg hover:bg-slate-300 m-2 
        cursor-pointer transition-transform duration-500 ease-in-out ${isAsideOpen ? 'mr-[170px]' : 'mr-5'}`}>
        <LuMenu className='w-12 h-6 text-gray-600 z-40' />
      </button>
    </header>
  );
};

export default Header;



