import { IPartner } from "@/types/partner";

export const ColumnPartner = [
    {
        name: "Name",
        selector: (row: IPartner) => row.name,
        sortable: true
    },
    {
        name: "Kode",
        selector: (row: IPartner) => row.code,
        sortable: true
    },
    {
        name: "Email",
        selector: (row: IPartner) => row.email,
        sortable: true
    },
    {
        name: "No Telepon",
        selector: (row: IPartner) => row.phone,
        sortable: false
    },
    {
        name: "Alamat",
        selector: (row: IPartner) => row.address,
        sortable: true
    },
    {
        name: "Mulai",
        selector: (row: IPartner) => new Date(row.startDateSubscription).toLocaleString().split(",")[0],
        sortable: true
    },
    {
        name: "Berakhir",
        selector: (row: IPartner) => new Date(row.endDateSubscription).toLocaleString().split(",")[0],
        sortable: true
    },
    {
        name: "Status",
        selector: (row: IPartner) => row.status,
        sortable: true
    },
    {
        name: "Action",
        selector: (row: any) => row.action,
        sortable: true,
        width: "200px"
    },
]