import { IArea } from "@/types/area";

export const ColumnArea = [
    {
        name: "Name",
        selector: (row: IArea) => row.name,
        sortable: true
    },
    {
        name: "Lokasi",
        selector: (row: any) => row.location,
        sortable: true
    },
    {
        name: "Status",
        selector: (row: IArea) => row.status,
        sortable: true
    },
    {
        name: "Action",
        selector: (row: any) => row.action,
        sortable: true
    },
]