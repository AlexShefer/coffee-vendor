import { useState } from "react";
import { Table } from "../table/Table";
import { Modal } from "../modal/Modal";
import MOCK_DATA from "../../data/data.json";
import { GrUpdate } from "react-icons/gr";
import { BiCoffeeTogo } from "react-icons/bi";
import { MdCoffeeMaker } from "react-icons/md";
import {
    getFormattedFirstDayOfCurrentMonth,
    getCurrentDateFormatted,
    filteredData,
    countDays,
    countCoffeeMachines,
} from "../../utils/helperFunctions";

import "./tabs.css";

export const Tabs = () => {
    const [tabIndex, setTabIndex] = useState(1);
    const [inputDateFromTo, setInputDateFromTo] = useState({
        from: "",
        to: "",
    });
    const [dateFilter, setFilterDate] = useState({
        from: getFormattedFirstDayOfCurrentMonth(),
        to: getCurrentDateFormatted(),
    });
    const [showModal, setShowModal] = useState(false);

    const handleSelectTab = (tabIndex: number): void => {
        setTabIndex(tabIndex);
    };

    const tableData = filteredData(dateFilter.from, dateFilter.to, MOCK_DATA);

    const numberOfDays = countDays(dateFilter.from, dateFilter.to);

    const numberMachines = countCoffeeMachines(tableData);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const modal = (
        <Modal
            onClose={handleCloseModal}
            setInputDateFromTo={setInputDateFromTo}
            value={inputDateFromTo}
            updateFilter={setFilterDate}
        />
    );

    return (
        <div className="tabs">
            {showModal && modal}
            <div className="tabs__header">
                <h1 className="tabs__header__title">
                    {tabIndex === 1 ? "Overview" : "Sales Export"}
                </h1>
                <div className="tabs__header__info">
                    <div className="tabs__header__info__icon">
                        <MdCoffeeMaker className="tabs__header__info__icon__consumptions" />{" "}
                        {numberMachines}
                    </div>
                    <div className="tabs__header__info__icon icon--underlined">
                        <BiCoffeeTogo className="tabs__header__info__icon__consumptions" />{" "}
                        {tableData.length}
                        {/* <span className="tabs__header__info__icon icon--underline">
                            within the last {numberOfDays}
                        </span> */}
                    </div>
                    <div className="tabs__header__info__filter">
                        <button
                            className="tabs__header__info__filter__button"
                            onClick={handleShowModal}
                        >
                            <GrUpdate className="tabs__header__info__filter__button__icon" />
                        </button>
                        <p>{dateFilter.from}</p>
                        <p>{dateFilter.to}</p>
                    </div>
                </div>
            </div>
            <div className="tabs__content">
                <div
                    style={
                        tabIndex === 1
                            ? { display: "block" }
                            : { display: "none" }
                    }
                >
                    first tab
                </div>
                <div
                    style={
                        tabIndex === 2
                            ? { display: "block" }
                            : { display: "none" }
                    }
                >
                    <Table tableData={tableData} />
                </div>
            </div>
            <div className="tabs__navigation-block">
                <div
                    className={`tabs__navigation-block__btn ${
                        tabIndex === 1 ? "active_btn" : ""
                    }`}
                    onClick={() => handleSelectTab(1)}
                >
                    Overview
                </div>
                <div
                    className={`tabs__navigation-block__btn ${
                        tabIndex === 2 ? "active_btn" : ""
                    }`}
                    onClick={() => handleSelectTab(2)}
                >
                    Sale Export
                </div>
                <div className="modal-container"></div>
            </div>
        </div>
    );
};
