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
        name: "Address",
        width:"200px",
        selector: (row: any) => row.address || "-",
        sortable: true
    },
    {
        name: "Placement",
        selector: (row: any) => row.location.toUpperCase(),
        sortable: true
    },
    {
        name: "Role",
        selector: (row: any) => row.role,
        sortable: true
    },
    {
        name: "Status",
        selector: (row: any) => row.status,
        sortable: true
    },
    {
        name: "Action",
        selector: (row: any) => row.action,
        sortable: true
    },
]