import { DataType } from "../../types/data.type";
import { Consumptions } from "../consumptions/Consumptions";
import { DispensingCard } from "../dispansing-card/DispensingCard";
import "./saleExport.css";
type SaleExportProp = { tableData: DataType[]; days: number };

export const SaleExport = ({ tableData, days }: SaleExportProp) => {
    return (
        <div className="sale-export">
            <div className="sale-export_container">
                <DispensingCard />
                <Consumptions tableData={tableData} days={days} />
                <Consumptions tableData={tableData} days={days} />
                <Consumptions tableData={tableData} days={days} />
            </div>
        </div>
    );
};
