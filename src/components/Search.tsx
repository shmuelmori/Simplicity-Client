import { useDispatch } from 'react-redux';
import UseUsers from '../hooks/UseUsers';
import { AppDispatch } from '../redux/store';
import { initialUsers } from '../redux/slices/usersSlice';

export default function Search() {
    const dispatch: AppDispatch = useDispatch();
    const { searchUser } = UseUsers();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        if (text.length === 0)
            dispatch(initialUsers());
        else
            searchUser(text);
    }

    return (
        <input
            type="text"
            placeholder="Search"
            className="block w-full p-2 border text-gray-500 border-gray-300 rounded-md focus:outline-none ring-2 focus:ring-blue-500 transition duration-150 dark:bg-transparent dark:text-white dark:placeholder:text-gray-200"
            onChange={handleChange}
            required
        />
    )
}