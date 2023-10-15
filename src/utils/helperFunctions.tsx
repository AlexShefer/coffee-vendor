import { DataType } from "../types/data.type";

export function getFormattedFirstDayOfCurrentMonth(): string {
    const today: Date = new Date();
    const firstDay: Date = new Date(today.getFullYear(), today.getMonth(), 1);
    const formattedDate: string = `${String(firstDay.getDate()).padStart(
        2,
        "0"
    )}.${String(firstDay.getMonth() + 1).padStart(
        2,
        "0"
    )}.${firstDay.getFullYear()}`;
    return formattedDate;
}
export function getCurrentDateFormatted(): string {
    const today: Date = new Date();
    const day: string = String(today.getDate()).padStart(2, "0");
    const month: string = String(today.getMonth() + 1).padStart(2, "0");
    const year: string = String(today.getFullYear());
    return `${day}.${month}.${year}`;
}

export const filteredData = (
    start: string,
    finish: string,
    data: DataType[]
): DataType[] => {
    const parseDate = (dateString: string) => {
        const parts = dateString.split(".");
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    };

    const startDate = parseDate(start);
    const endDate = parseDate(finish);
    return data.filter((item) => {
        const itemDate = new Date(item.Date);
        return itemDate >= startDate && itemDate <= endDate;
    });
};
export function countDays(
    startDateString: string,
    finishDateString: string
): number {
    const startDateParts: string[] = startDateString.split(".");
    const finishDateParts: string[] = finishDateString.split(".");

    const startDate: Date = new Date(
        parseInt(startDateParts[2]),
        parseInt(startDateParts[1], 10) - 1,
        parseInt(startDateParts[0])
    );
    const finishDate: Date = new Date(
        parseInt(finishDateParts[2]),
        parseInt(finishDateParts[1], 10) - 1,
        parseInt(finishDateParts[0])
    );

    const oneDay: number = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds

    // Round to remove daylight saving time effects
    const diffDays: number = Math.round(
        Math.abs((startDate.getTime() - finishDate.getTime()) / oneDay)
    );

    return diffDays + 1;
}

export function changeDateFormat(inputDate: string): string {
    const parts: string[] = inputDate.split("-");
    if (parts.length !== 3) {
        // Invalid date format
        return "Invalid date format";
    }
    const [year, month, day] = parts;
    return `${day}.${month}.${year}`;
}

export const countCoffeeMachines = (data: DataType[]): number => {
    const uniqueSKUs: Set<number> = new Set();
    data.forEach((item) => {
        if (!uniqueSKUs.has(item.SKU)) {
            uniqueSKUs.add(item.SKU);
        }
    });
    return uniqueSKUs.size;
};
