import { DataType } from "../types/data.type";

export const getFormattedFirstDayOfCurrentMonth = (): string => {
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
};
export const getCurrentDateFormatted = (): string => {
    const today: Date = new Date();
    const day: string = String(today.getDate()).padStart(2, "0");
    const month: string = String(today.getMonth() + 1).padStart(2, "0");
    const year: string = String(today.getFullYear());
    return `${day}.${month}.${year}`;
};

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

    const adjustEndDate = (date: Date) => {
        const adjustedDate = new Date(date);
        adjustedDate.setHours(23, 59, 59, 999); // Set time to end of the day
        return adjustedDate;
    };

    const startDate = parseDate(start);
    const endDate = adjustEndDate(parseDate(finish));

    return data.filter((item) => {
        const itemDate = new Date(item.Date);
        return itemDate >= startDate && itemDate <= endDate;
    });
};
export const countDays = (
    startDateString: string,
    finishDateString: string
): number => {
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
};

export const changeDateFormat = (inputDate: string): string => {
    const parts: string[] = inputDate.split("-");
    if (parts.length !== 3) {
        // Invalid date format
        return "Invalid date format";
    }
    const [year, month, day] = parts;
    return `${day}.${month}.${year}`;
};

export const countCoffeeMachines = (data: DataType[]): number => {
    const uniqueSKUs: Set<number> = new Set();
    data.forEach((item) => {
        if (!uniqueSKUs.has(item.SKU)) {
            uniqueSKUs.add(item.SKU);
        }
    });
    return uniqueSKUs.size;
};
export const countIngredientSpent = (
    arr: DataType[],
    ingredientName: string,
    measurementSystem: string
): number => {
    let totalSpent = 0;

    for (let i = 0; i < arr.length; i++) {
        const currentRecipe = arr[i].Recipe;

        if (currentRecipe) {
            const ingredientValue =
                currentRecipe[ingredientName as keyof typeof currentRecipe];

            if (typeof ingredientValue === "number") {
                if (isBulkIngredient(ingredientName)) {
                    totalSpent += convertBulkIngredient(
                        ingredientValue,
                        measurementSystem
                    );
                } else if (isLiquidIngredient(ingredientName)) {
                    totalSpent += convertLiquidIngredient(
                        ingredientValue,
                        measurementSystem
                    );
                }
            }
        }
    }

    return Number(totalSpent.toFixed(2));
};

export const isBulkIngredient = (ingredientName: string): boolean => {
    const bulkIngredients = ["coffee", "syrup", "sugar"];
    return bulkIngredients.includes(ingredientName);
};

const isLiquidIngredient = (ingredientName: string): boolean => {
    const liquidIngredients = ["milk", "water"];
    return liquidIngredients.includes(ingredientName);
};

const convertBulkIngredient = (value: number, system: string): number => {
    if (system === "us") {
        return (value * 2.205) / 1000; // Convert kilograms to pounds for the US system
    }
    return value / 1000;
};

const convertLiquidIngredient = (value: number, system: string): number => {
    if (system === "us") {
        return (value * 0.264172) / 1000; // Convert liters to gallons for the US system
    }
    return value / 1000;
};

export const sumDispensing = (data: DataType[]): number => {
    return data.reduce((acc, curr) => acc + curr.SummedDispensing, 0);
};
