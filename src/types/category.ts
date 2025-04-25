export interface ICategory {
    id:        string;
    partnerId: string;
    areaId:    string;
    name:      string;
    price:     number;
    days:      number[];
    createdAt: number;
    updatedAt: number;
}