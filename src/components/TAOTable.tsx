import "./TAOTable.css";
import React, {FC} from "react";
import { useTable, Column, Cell } from "react-table";
import { TAOOrder } from "../App";



// type TestData = {
//     id: string;
//     first_name: string;
//     last_name:string;
//     email: string;
//     gender:string;
//     university:string;
// }


interface TAOTableProps  {
    tableData: TAOOrder[];
}



const  TAOTable: FC<TAOTableProps> = ({tableData}) =>  {
  const data = tableData;
  const columns  = React.useMemo(
    () => [
    {Header: "Edit",
        Cell: (cell:Cell) => (
          <button value={cell.row.values.name} onClick={() => handleClick(cell)}>
            Edit
          </button>
    )},
    {Header: "Delete",
    Cell: (cell:Cell) => (
      <button value={cell.row.values.name} onClick={() =>handleClick(cell)}>
        Delete
      </button>
)},
      {
        Header: "TAO ID",
        accessor: "taoid",
      },
      {
        Header: "Departments",
        accessor: "dept",
      },
      {
        Header: "Providers",
        accessor: "provider",
      },
      {
        Header: "Genus",
        accessor: "genus",
      },
      {
        Header: "Order Type",
        accessor: "orderType",
      },
      {
        Header: "Priority",
        accessor: "priority",
      },
      {
        Header: "Bucket",
        accessor: "bucket",
      },
    ] as Column<TAOOrder>[],
    []
  );
  const handleClick = (e:Cell) => {
    console.log('Current Target', e.row.values)
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="TAOTable">
      <div className="TAOTable-container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TAOTable;