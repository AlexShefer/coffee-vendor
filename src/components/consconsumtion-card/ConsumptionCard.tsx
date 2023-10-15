import { DataType } from "../../types/data.type";
import { isBulkIngredient } from "../../utils/helperFunctions";
import { countIngredientSpent } from "../../utils/helperFunctions";
import "./consumption-card.css";

type ConsumptionCardProps = {
    tableData: DataType[];
    children: JSX.Element;
    days: number;
    ingredientName: "milk" | "water" | "coffee" | "syrup" | "sugar";
    measuringSystem: string;
};
export const ConsumptionCard = ({
    children,
    tableData,
    days,
    ingredientName,
    measuringSystem,
}: ConsumptionCardProps) => {
    const ingredientConsumption = countIngredientSpent(
        tableData,
        ingredientName,
        measuringSystem
    );
    const unit = (measuringSystem: string, ingredientName: string): string => {
        if (isBulkIngredient(ingredientName)) {
            if (measuringSystem === "metric") {
                return "kg";
            } else {
                return "lbs";
            }
        } else {
            if (measuringSystem === "metric") {
                return "liters";
            } else {
                return "gallons";
            }
        }
    };
    const unitValue = unit(measuringSystem, ingredientName);
    return (
        <div className="consumption-card">
            <div className="consumption-card__icon">{children}</div>

            <p className="consumption-card__amount">{ingredientConsumption}</p>
            <p className="consumption-card__description">
                {unitValue} of {ingredientName} were consumed within the last{" "}
                <span className="consumption-card__duration">{days}</span> days.
            </p>
        </div>
    );
};
