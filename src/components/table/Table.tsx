import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { BiSortAlt2, BiSortDown, BiSortUp } from "react-icons/bi";
import { COLUMNS } from "./columns";
import { DataType } from "../../types/data.type";
import "./table.css";

type TableProp = { tableData: DataType[] };

export const Table = ({ tableData }: TableProp) => {
    const columns: any = useMemo(() => COLUMNS, []);
    const data = useMemo(() => tableData, [tableData]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    }: any = useTable(
        {
            columns,
            data,
        },

        useGlobalFilter,
        useSortBy
    );

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup: any) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <BiSortUp />
                                            ) : (
                                                <BiSortDown />
                                            )
                                        ) : (
                                            <BiSortAlt2 />
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row: any) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell: any) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};
