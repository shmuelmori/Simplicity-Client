export interface IUser {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    workSpaceList: string[],
    icon: string,
}

export interface IGroup {
    _id: string;
    name: string;
    description: string;
    projectId: string;
}

export type UserUpdate = {
    firstName: string,
    lastName: string,
    phone: string,
    _id: string,
}

export type UserSignUp = {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string
}

export type Credentials = {
    email: string,
    password: string
}

export interface IProject {
    _id: string,
    name: string,
    description: string,
    icon: string
}

export type NewProject = {
    name: string;
    description: string;
    icon?: string;
}

export type Project = {
    name: string,
    description: string,
    icon: string,
}

export type SideBar2Props = {
    projectList: Project[];
};

export type UpdateGroupType = {
    name: string;
    description: string;
    _id: string,
}

export interface ITask {
    _id: string;
    name: string;
    description: string;
    status: "TO DO" | "IN PROGRESS" | "COMPLETE";
    duration: number;
    groupId: string;
}

export interface ButtonExportProps {
    rout: string;
    _id?: string;
    name: string;
}