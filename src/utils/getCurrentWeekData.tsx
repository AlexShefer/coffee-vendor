import { DataType } from "../types/data.type";

type DayData = {
    day: string;
    SummedDispensingCurrent: number;
    SummedDispensingPrevious: number;
};

// Get the dates of the days of the week current and previous
export const getDatesForWeek = (
    weekType: string
): { [key: string]: string }[] => {
    const currentDate = new Date();
    const dates: { [key: string]: string }[] = [];

    const getWeekDates = (date: Date) => {
        const day = date.getDay(); // 0 (Sunday) to 6 (Saturday)
        const diff = date.getDate() - day + (weekType === "previous" ? -7 : 0); // Adjust the difference for the previous week
        const weekStart = new Date(date.setDate(diff));

        for (let i = 0; i < 7; i++) {
            const day = new Date(weekStart);
            day.setDate(weekStart.getDate() + i);
            const dayName = getDayName(i);
            dates.push({ [dayName]: day.toISOString().split("T")[0] });
        }
    };

    getWeekDates(
        weekType === "previous"
            ? new Date(currentDate.getTime() - 7)
            : currentDate
    );

    return dates;
};

const getDayName = (index: number): string => {
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return days[index];
};

const filterDataByDate = (
    start: string,
    finish: string,
    data: DataType[]
): DataType[] => {
    const startDate = new Date(start);
    const endDate = new Date(finish);
    return data.filter((item) => {
        const itemDate = new Date(item.Date);
        return itemDate >= startDate && itemDate <= endDate;
    });
};
const convertToDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // Month is 0-indexed
};

const getWeekData = (
    data: DataType[],
    prevWeek: { [key: string]: string }[],
    currentWeek: { [key: string]: string }[]
): DayData[] => {
    const lastTwoWeekData = filterDataByDate(
        prevWeek[0].Sunday,
        currentWeek[6].Saturday,
        data
    );

    const SummedDispensing: DayData[] = [
        {
            day: "Sunday",
            SummedDispensingCurrent: 0,
            SummedDispensingPrevious: 0,
        },
        {
            day: "Monday",
            SummedDispensingCurrent: 0,
            SummedDispensingPrevious: 0,
        },
        {
            day: "Tuesday",
            SummedDispensingCurrent: 0,
            SummedDispensingPrevious: 0,
        },
        {
            day: "Wednesday",
            SummedDispensingCurrent: 0,
            SummedDispensingPrevious: 0,
        },
        {
            day: "Thursday",
            SummedDispensingCurrent: 0,
            SummedDispensingPrevious: 0,
        },
        {
            day: "Friday",
            SummedDispensingCurrent: 0,
            SummedDispensingPrevious: 0,
        },
        {
            day: "Saturday",
            SummedDispensingCurrent: 0,
            SummedDispensingPrevious: 0,
        },
    ];

    lastTwoWeekData.forEach((item) => {
        const itemDate = new Date(item.Date);
        console.log("itemDate", itemDate);
        console.log("item.Date", item.Date);
        const dayIndex = itemDate.getDay();
        console.log("dayIndex", dayIndex);
        const dayName = getDayName(dayIndex);
        console.log("dayName", dayName);
        const index = SummedDispensing.findIndex(
            (element) => element.day === dayName
        );
        console.log("index", index);
        console.log(
            "new Date(currentWeek[0].Monday)",
            new Date(currentWeek[0].Monday)
        );
        console.log(itemDate < new Date(currentWeek[0].Sunday));
        if (index !== -1) {
            if (itemDate < new Date(currentWeek[0].Sunday)) {
                SummedDispensing[index].SummedDispensingPrevious +=
                    item.SummedDispensing;
            } else {
                SummedDispensing[index].SummedDispensingCurrent +=
                    item.SummedDispensing;
            }
        }
    });

    return SummedDispensing;
};

type WeekData = {
    week: string;
    dayData: DayData[];
};

export const composeVisualizationData = (data: DataType[]): WeekData[] => {
    const prevWeek = getDatesForWeek("previous");
    const currentWeek = getDatesForWeek("current");
    const weekData = getWeekData(data, prevWeek, currentWeek);
    const result = { week: currentWeek[0].Sunday, dayData: weekData };
    return [result];
};

export const calculateTotalDispensing = (
    data: WeekData[]
): { sumDispensingPrevWeek: number; sumDispensingCurrentWeek: number } => {
    let sumDispensingPrevWeek = 0;
    let sumDispensingCurrentWeek = 0;

    for (const weekData of data) {
        for (const day of weekData.dayData) {
            sumDispensingPrevWeek += day.SummedDispensingPrevious;
            sumDispensingCurrentWeek += day.SummedDispensingCurrent;
        }
    }

    return { sumDispensingPrevWeek, sumDispensingCurrentWeek };
};
