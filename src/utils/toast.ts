import { toast } from "react-hot-toast";

export const loginToast = () =>
    toast.success("Hey you logged in ", {
        duration: 3000,
        position: "top-center",
        icon: "👍",
    });
export const logoutToast = () =>
    toast.success("Hey you logged out ", {
        duration: 3000,
        icon: "👋",
    });

export const errorFromServer = (message: string) => {
    toast.error(message, {
        duration: 3000,
        id: 'errorMessage',
        position: "top-center",
    });
};

export const successFromServer = (message: string) => {
    toast.success(message, {
        duration: 3000,
        id: 'successMessage',
        position: "top-center",
    });
};