// import { IUsers } from "@/types/user";

export const ColumnUser = [
    {
        name: "Name",
        selector: (row: any) => row.name,
        sortable: true
    },
    {
        name: "Email",
        selector: (row: any) => row.email,
        sortable: true
    },
    {
        name: "Phone Number",
        selector: (row: any) => row.phone,
        sortable: true
    },
    {
        name: "Role",
        selector: (row: any) => row.role,
        sortable: true
    },
    {
        name: "Action",
        selector: (row: any) => row.action,
        sortable: true
    },
]