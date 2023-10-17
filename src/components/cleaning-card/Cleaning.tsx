import { calculateTotalCleaning } from "../../utils/getCurrentWeekData";
import { CleaningChart } from "../cleaning-chart/CleaningChart";
import MOCK_DATA from "../../data/data.json";
import "./cleaning.css";

export const Cleaning = () => {
    const data = calculateTotalCleaning(MOCK_DATA);
    return (
        <div className="dispensing-card">
            <h2 className="cleaning-card__title">Cleaning</h2>
            <div className="cleaning-card__subtitle">
                <span className="cleaning-card__subtitle-text">Week</span>
                <div className="cleaning-card__subtitle-color color-blue"></div>
                - current week
                <div className="cleaning-card__subtitle-color color-orange"></div>
                -previous week
            </div>
            <div className="cleaning-card__content">
                <CleaningChart data={data} />
                <div className="cleaning-card__summary">
                    <div className="cleaning-card__card">
                        <p className="cleaning-card__card-text">
                            {data.currWeekCleaning}
                        </p>
                        <p className="cleaning-card__card-description">
                            times on average was each machine was cleaned within{" "}
                            <span className="cleaning-card__card-description-highlight">
                                previous
                            </span>{" "}
                            week
                        </p>
                    </div>
                    <div className="cleaning-card__card">
                        <p className="cleaning-card__card-text">
                            {data.prevWeekCleaning}
                        </p>
                        <p className="cleaning-card__card-description">
                            times on average was each machine was cleaned within{" "}
                            <span className="cleaning-card__card-description-highlight">
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
