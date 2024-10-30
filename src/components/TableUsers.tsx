import { useState } from "react";
import { IUser } from "../utils/types";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin7Line } from "react-icons/ri";
import UpdateUser from "../pages/UpdateUser";
import DeleteUser from "./DeleteUser";
import { AppDispatch } from "../redux/store";
import { setUsers } from "../redux/slices/usersSlice";
import { useDispatch } from "react-redux";
import Loading from "./Loading";
import UseUsers from "../hooks/UseUsers";

type Sort = {
  key: keyof IUser | null;
  direction: "asc" | "desc";
};

type Prop = {
  users: IUser[];
}

const Table = ({ users }: Prop) => {
  const dispatch: AppDispatch = useDispatch();
  const { loading } = UseUsers();
  const [popUpdateUser, setPopUpdateUser] = useState<boolean>(false);
  const [popDeleteUser, setPopDeleteUser] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [sortConfig, setSortConfig] = useState<Sort>({
    key: null,
    direction: "asc",
  });

  // Function to handle sorting
  const sortData = (key: keyof IUser) => {
    const sortedData: IUser[] = [...users];
    const direction = sortConfig.direction === "asc" ? "desc" : "asc";

    sortedData.sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    dispatch(setUsers(sortedData));
    setSortConfig({ key, direction });
  };

  if (!users || users.length === 0) {
    return <p className="mt-16 text-2xl dark:text-white">No users found.</p>;
  }

  if (loading) return <Loading />

  return (
    <div className="w-full sm:w-[80%] overflow-x-auto mt-2">
      <table className="min-w-[400px] w-[99%] text-center border-separate border-spacing-y-1">
        <thead>
          <tr className="bg-white dark:bg-gray-600 dark:text-white">
            <th className="p-2 cursor-pointer">Icon</th>
            <th
              onClick={() => sortData("firstName")}
              className="p-2 cursor-pointer border-l-2"
            >
              First name
            </th>
            <th
              onClick={() => sortData("lastName")}
              className="p-2 cursor-pointer border-l-2"
            >
              Last name
            </th>
            <th
              onClick={() => sortData("email")}
              className="p-2 cursor-pointer border-l-2"
            >
              Email
            </th>
            <th className="p-2 cursor-pointer border-l-2">Phone</th>
            <th className="p-2 cursor-pointer border-l-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="transition-transform duration-300 ease-in-out bg-white dark:bg-gray-600 dark:text-white"
            >
              <td>
                <div className="w-full flex justify-center items-center">
                  {user.icon ? (
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={user.icon}
                      alt=""
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full flex justify-center items-center object-cover bg-gray-200">
                      👤
                    </div>
                  )}
                </div>
              </td>
              <td className="py-1 px-4">{user.firstName}</td>
              <td className="py-1 px-4">{user.lastName}</td>
              <td className="py-1 px-4">{user.email}</td>
              <td className="py-1 px-4">{user.phone}</td>
              <td className="py-1 px-4 text-center">
                <div className="flex flex-row items-center justify-center">
                  <div className="rounded-full flex justify-center items-center object-cover hover:bg-gray-100 dark:hover:bg-black transition transform duration-200 cursor-pointer">
                    <LiaEdit
                      onClick={() => {
                        setSelectedUser(user);
                        setPopUpdateUser(true);
                      }}
                      className="m-2"
                    />
                  </div>
                  <div className="rounded-full flex justify-center items-center object-cover hover:bg-gray-100 dark:hover:bg-black transition transform duration-200 cursor-pointer">
                    <RiDeleteBin7Line
                      onClick={() => {
                        setSelectedUser(user);
                        setPopDeleteUser(true);
                      }}
                      className="m-2"
                    />
                  </div>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {popUpdateUser && selectedUser && (
        <UpdateUser
          setPopUpdateUser={setPopUpdateUser}
          data={selectedUser}
        />
      )}

      {popDeleteUser && selectedUser && (
        <DeleteUser
          setPopDeleteUser={setPopDeleteUser}
          data={selectedUser}
        />
      )}
    </div>
  );
};

export default Table;
