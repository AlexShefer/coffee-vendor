import { ConsumptionCard } from "../consconsumtion-card/ConsumptionCard";
import { DataType } from "../../types/data.type";
import {
    GiCoffeeBeans,
    GiWaterDrop,
    GiWaterBottle,
    GiPowderBag,
} from "react-icons/gi";
import { LuMilk } from "react-icons/lu";
import { useState } from "react";
import "./consumptions.css";
type ConsumptionsProp = { tableData: DataType[]; days: number };

export const Consumptions = ({ tableData, days }: ConsumptionsProp) => {
    const [measuringSystem, setMeasuringSystem] = useState("metric");
    const switchMeasuringSystem = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.name === "us") {
            setMeasuringSystem("us");
        } else if (e.currentTarget.name === "metric") {
            setMeasuringSystem("metric");
        }
    };
    console.log(measuringSystem);
    return (
        <div className="consumptions">
            <div className="consumptions__headline">
                <h2 className="consumptions__title">Consumption</h2>
                <div>
                    <button
                        className={`consumptions__button ${
                            measuringSystem === "us"
                                ? "consumptions__button--disabled"
                                : ""
                        }`}
                        onClick={(e) => switchMeasuringSystem(e)}
                        name="us"
                        disabled={measuringSystem === "us"}
                    >
                        us
                    </button>
                    <button
                        className={`consumptions__button ${
                            measuringSystem === "metric"
                                ? "consumptions__button--disabled"
                                : ""
                        }`}
                        onClick={(e) => switchMeasuringSystem(e)}
                        name="metric"
                        disabled={measuringSystem === "metric"}
                    >
                        metric
                    </button>
                </div>
            </div>

            <div className="consumptions__grid">
                <ConsumptionCard
                    days={days}
                    tableData={tableData}
                    ingredientName="water"
                    measuringSystem={measuringSystem}
                >
                    <GiWaterDrop />
                </ConsumptionCard>
                <ConsumptionCard
                    days={days}
                    tableData={tableData}
                    ingredientName="coffee"
                    measuringSystem={measuringSystem}
                >
                    <GiCoffeeBeans />
                </ConsumptionCard>
                <ConsumptionCard
                    days={days}
                    tableData={tableData}
                    ingredientName="milk"
                    measuringSystem={measuringSystem}
                >
                    <LuMilk />
                </ConsumptionCard>
                <ConsumptionCard
                    days={days}
                    tableData={tableData}
                    ingredientName="syrup"
                    measuringSystem={measuringSystem}
                >
                    <GiWaterBottle />
                </ConsumptionCard>
                <ConsumptionCard
                    days={days}
                    tableData={tableData}
                    ingredientName="sugar"
                    measuringSystem={measuringSystem}
                >
                    <GiPowderBag />
                </ConsumptionCard>
                <div className="consumptions__note">
                    <p>
                        Please be aware that the quantities may differ from
                        reality and that the numbers and the numbers for today
                        might not be available
                    </p>
                </div>
            </div>
        </div>
    );
};
