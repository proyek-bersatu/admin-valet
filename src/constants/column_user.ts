// import { IUsers } from "@/types/user";

import { IUser } from "@/types/user";

export const ColumnUser = [
    {
        name: "Nama",
        selector: (row: IUser) => row.name,
        sortable: true
    },
    {
        name: "Username",
        selector: (row: IUser) => row.username,
        sortable: true
    },
    {
        name: "Email",
        selector: (row: IUser) => row.email,
        sortable: true
    },
    {
        name: "Phone Number",
        selector: (row: IUser) => row.phone,
        sortable: true
    },
    {
        name: "Role",
        selector: (row: IUser) => row.role,
        sortable: true
    },
    {
        name: "Action",
        selector: (row: any) => row.action,
        sortable: true
    },
]