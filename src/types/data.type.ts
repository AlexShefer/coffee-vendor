export type DataType = {
    id: number;
    CustomMachineName: string;
    PATH: string;
    ProductGroup: string;
    MachineNumber: string;
    Date: string;
    SKU: number;
    RecipeTitle: string;
    Recipe: {
        water: number;
        milk?: number;
        coffee: number;
        cupSize: string;
    };
    CupSize: string;
    Status: string;
    SummedDispensing: number;
};
