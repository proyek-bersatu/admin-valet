export interface ICategory {
    id:        string;
    partnerId: string;
    areaId:    string;
    name:      string;
    price:     number;
    days:      number[];
    type:      "BIKE" | "CAR";
    createdAt: number;
    updatedAt: number;
}