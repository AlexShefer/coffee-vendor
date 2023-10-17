import {
    composeVisualizationData,
    calculateTotalDispensing,
} from "../../utils/getCurrentWeekData";
import MOCK_DATA from "../../data/data.json";
import { DispensingChart } from "../dispensing-chart/DispensingChart";
import "./dispensing-card.css";

export const DispensingCard = () => {
    const data = composeVisualizationData(MOCK_DATA);
    const sumDispensing = calculateTotalDispensing(data);
    return (
        <div className="dispensing-card">
            <h2 className="dispensing-card__title">Dispensing by day</h2>
            <div className="dispensing-card__subtitle">
                <span className="dispensing-card__subtitle-text">Week</span>
                <div className="dispensing-card__subtitle-color color-blue"></div>
                - current week
                <div className="dispensing-card__subtitle-color color-orange"></div>
                -previous week
            </div>
            <div className="dispensing-card__content">
                <DispensingChart data={data} />
                <div className="dispensing-card__summary">
                    <div className="dispensing-card__card">
                        <p className="dispensing-card__card-text">
                            {sumDispensing.sumDispensingPrevWeek}
                        </p>
                        <p className="dispensing-card__card-description">
                            dispensing were served within{" "}
                            <span className="dispensing-card__card-description-highlight">
                                previous
                            </span>{" "}
                            week
                        </p>
                    </div>
                    <div className="dispensing-card__card">
                        <p className="dispensing-card__card-text">
                            {sumDispensing.sumDispensingCurrentWeek}
                        </p>
                        <p className="dispensing-card__card-description">
                            dispensing were served within{" "}
                            <span className="dispensing-card__card-description-highlight">
                                current
                            </span>{" "}
                            week
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
