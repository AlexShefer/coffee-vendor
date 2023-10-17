import { DataType } from "../../types/data.type";
import { sumDispensing } from "../../utils/helperFunctions";
import { DispensingByHierarchyChart } from "../dispensing-by-hierarchy-chart/DispensingByHierarchyChart";
import "./dispensing-by-hierarchy.css";

type ConsumptionsProp = { tableData: DataType[]; days: number };
export const DispensingByHierarchy = ({
    tableData,
    days,
}: ConsumptionsProp) => {
    const sumDispensingByPeriod = sumDispensing(tableData);
    return (
        <div className="dispensing-by-hierarchy">
            <h2 className="dispensing-by-hierarchy__title">
                Dispensing by Hierarchy Level (Average Per Machine)
            </h2>

            <div className="dispensing-by-hierarchy__content">
                <DispensingByHierarchyChart data={sumDispensingByPeriod} />
                <div className="dispensing-by-hierarchy__summary">
                    <div className="dispensing-by-hierarchy__card">
                        <p className="dispensing-by-hierarchy__card-text">
                            {sumDispensingByPeriod}
                        </p>
                        <p className="dispensing-by-hierarchy__card-description">
                            were served{" "}
                            <span className="dispensing-by-hierarchy__card-description-highlight">
                                in the highest rank
                            </span>
                        </p>
                    </div>
                    <div className="dispensing-by-hierarchy__card">
                        <p className="dispensing-by-hierarchy__card-text">
                            TAT
                        </p>
                        <p className="dispensing-by-hierarchy__card-description">
                            on average per machine within the last within last
                            <span className="dispensing-by-hierarchy__card-description-highlight">
                                {days}
                            </span>{" "}
                            last
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
