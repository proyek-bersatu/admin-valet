import { ICategory } from "@/types/category";
import { toMoney } from "@/utils";
import { Days } from "./days";

export const ColumnCategory = [
    {
        name: "Nama",
        selector: (row: ICategory) => row.name,
        sortable: true
    },
    {
        name: "Tipe",
        selector: (row: ICategory) => row.type == "BIKE" ? "Motor" : "Mobil",
        sortable: true
    },
    {
        name: "Hari",
        selector: (row: ICategory) => Days(row.days),
        sortable: true
    },
    {
        name: "Tarif",
        selector: (row: ICategory) => toMoney(row.price),
        sortable: true
    },
    {
        name: "Action",
        selector: (row: any) => row.action,
        sortable: true
    },
]