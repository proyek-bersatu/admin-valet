import { ITransaction } from "@/types/transaction";

export const ColumnTransaction = [
    {
        name: "Kode",
        selector: (row: ITransaction) => row.code,
        sortable: true
    },
    {
        name: "Lokasi",
        selector: (row: ITransaction) => row.areaName,
        sortable: true
    },
    {
        name: "Kategori",
        selector: (row: ITransaction) => row.categoryName,
        sortable: true
    },
    {
        name: "No Plat",
        selector: (row: ITransaction) => row.platNo,
        sortable: true
    },
    {
        name: "Tarif",
        selector: (row: ITransaction) => row.price,
        sortable: true
    },
    {
        name: "Ditangani Oleh",
        selector: (row: ITransaction) => row.cashierName,
        sortable: true
    },
    {
        name: "Status",
        selector: (row: ITransaction) => row.status,
        sortable: true
    },
    {
        name: "Action",
        selector: (row: any) => row.action,
        sortable: true
    },
]