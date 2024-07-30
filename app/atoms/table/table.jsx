import React, { useState } from "react";
import "./table.scss"; // Import CSS module
import RemoveButton from "../../molecules/removeButton/removeButton";

const TableComponent = ({
  data,
  columns,
  columnKeys,
  onRowClick,
  selectedRow,
  onRemove,
}) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Sorting
  const handleSort = (column) => {
    const newSortOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortOrder]);

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="tableContainer">
      <table className="table">
        <thead>
          <tr className="first_row">
            {columns.map((col, index) => (
              <th
                key={col}
                onClick={() => handleSort(columnKeys[index])}
                className="sortable"
              >
                {col} {sortColumn === col && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((item) => (
            <tr
              key={item._id}
              onClick={() => onRowClick(item)}
              className={selectedRow === item._id ? "selected" : ""}
            >
              {Object.entries(item).map(([key, value]) => (
                <td key={key}>{value !== undefined ? value : "N/A"}</td>
              ))}
              <td className="remove_column">
                <RemoveButton remove={onRemove} content={"Obriši"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "activePage" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
