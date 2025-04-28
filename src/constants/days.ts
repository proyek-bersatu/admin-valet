const getDay = (d: number) => {
    switch (d) {
        case 1:
            return "Senin";
        case 2:
            return "Selasa";
        case 3:
            return "Rabu";
        case 4:
            return "Kamis";
        case 5:
            return "Jumat";
        case 6:
            return "Sabtu";
        case 7:
            return "Minggu";
        default:
            return "";
    }
}

export const optionDays = [
    {
        value: 1,
        label: "Senin"
    },
    {
        value: 2,
        label: "Selasa"
    },
    {
        value: 3,
        label: "Rabu"
    },
    {
        value: 4,
        label: "Kamis"
    },
    {
        value: 5,
        label: "Jumat"
    },
    {
        value: 6,
        label: "Sabtu"
    },
    {
        value: 7,
        label: "Minggu"
    }
]

export const Days = (days: any[]) => {
    let daysString: any[] = [];

    days.forEach((day, index) => {
        daysString.push(getDay(day));
    });

    return daysString.join(", ");
}