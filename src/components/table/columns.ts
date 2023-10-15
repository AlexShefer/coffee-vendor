export type YourDataItemType = {
    id: number;
    CustomMachineName: string;
    PATH: string;
    ProductGroup: string;
    MachineNumber: string;
    Date: string;
    SKU: number;
    RecipeTitle: string;
    CupSize: string;
    Status: string;
    SummedDispensing: number;
};

type TableColumn = {
    Header: string;
    accessor: keyof YourDataItemType;
    Cell?: (cellProps: { value: string }) => void;
};

function formatDate(inputDate: string): string {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const date: Date = new Date(inputDate);
    const formattedDate: string = date.toLocaleDateString("ru-RU", options);
    return formattedDate;
}

export const COLUMNS: TableColumn[] = [
    {
        Header: "#",
        accessor: "id",
    },
    {
        Header: "Custom Machine Name",
        accessor: "CustomMachineName",
    },
    {
        Header: "PATH",
        accessor: "PATH",
    },
    {
        Header: "ProductGroup",
        accessor: "ProductGroup",
    },
    {
        Header: "MachineNumber",
        accessor: "MachineNumber",
    },
    {
        Header: "Date",
        accessor: "Date",
        Cell: ({ value }) => {
            return formatDate(value);
        },
    },
    {
        Header: "SKU",
        accessor: "SKU",
    },
    {
        Header: "Recipe",
        accessor: "RecipeTitle",
    },
    {
        Header: "Cup Size",
        accessor: "CupSize",
    },
    {
        Header: "Status",
        accessor: "Status",
    },
    {
        Header: "Summed Dispensing",
        accessor: "SummedDispensing",
    },
];
