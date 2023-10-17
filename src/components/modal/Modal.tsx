import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { changeDateFormat } from "../../utils/helperFunctions";
import "./modal.css";

type ModalProps = {
    onClose: () => void;
    updateFilter: React.Dispatch<
        React.SetStateAction<{
            from: string;
            to: string;
        }>
    >;
    setInputDateFromTo: React.Dispatch<
        React.SetStateAction<{
            from: string;
            to: string;
        }>
    >;
    value: {
        from: string;
        to: string;
    };
};

export const Modal: React.FC<ModalProps> = ({
    value,
    setInputDateFromTo,
    onClose,
    updateFilter,
}) => {
    const [modalHeader, setModalHeader] = useState(
        "Select a time period for data analysis"
    );
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setInputDateFromTo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleUpdateFilter = () => {
        if (value.from !== "" && value.to !== "") {
            const fromDate = new Date(value.from);
            const toDate = new Date(value.to);
            if (fromDate > toDate) {
                setModalHeader(
                    "Data entry error. The start date must be earlier than the end date. Please try again."
                );
                return;
            }
            const updatedDate = {
                from: changeDateFormat(value.from),
                to: changeDateFormat(value.to),
            };

            updateFilter(updatedDate);
            onClose();
        } else {
            setModalHeader(
                "Data entry error. Both fields must be filled in. Please ty again"
            );
        }
    };

    return ReactDOM.createPortal(
        <div className="modal">
            <div onClick={onClose} className="modal__overlay"></div>
            <div className="modal__content">
                <div className="modal__container">
                    <div className="modal__inner">
                        <div className="modal__body">
                            <h3 className="modal__body__header">
                                {modalHeader}
                            </h3>
                            <div className="modal__body__input-group">
                                <label htmlFor="from">From:</label>
                                <input
                                    type="date"
                                    name="from"
                                    value={value.from}
                                    onChange={(e) => handleInputChange(e)}
                                    id="from"
                                    min="2023-01-01"
                                    max="2023-12-31"
                                />
                                <label htmlFor="to">To:</label>
                                <input
                                    type="date"
                                    name="to"
                                    value={value.to}
                                    onChange={(e) => handleInputChange(e)}
                                    id="to"
                                    min="2023-01-01"
                                    max="2023-12-31"
                                />
                            </div>
                            <button
                                className="modal__body__close"
                                onClick={onClose}
                            >
                                Close
                            </button>
                            <button
                                className="modal__body__close"
                                onClick={handleUpdateFilter}
                            >
                                Update Filter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.querySelector(".modal-container") as HTMLElement
    );
};
