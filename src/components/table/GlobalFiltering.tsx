import React from "react";
type GlobalFilterProps = {
    filter: string;
    setFilter: (filter: string) => void;
};

export const GlobalFilter: React.FC<GlobalFilterProps> = ({
    filter,
    setFilter,
}) => {
    return (
        <span>
            Search:
            <input
                type="text"
                value={filter || ""}
                onChange={(e) => setFilter(e.target.value)}
            />
        </span>
    );
};
