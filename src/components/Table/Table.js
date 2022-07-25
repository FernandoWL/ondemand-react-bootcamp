import React from "react";
import PropTypes from "prop-types";
import "./table.css";

const Table = ({ data, title = "", numCells, cellLabel=true}) => {
  const cells = numCells?numCells:2;
  const chunk = (data, cells) => {
    const res = [];
    if (data !== undefined) {
      for (let i = 0; i < data.length; i += cells) {
        const chunk = data.slice(i, i + cells);
        res.push(chunk);
      }
    }
    return res;
  };

  const rows = chunk(data, cells);
  return (
    <div className="table">
      <div className="table-title">{title}</div>
      {rows &&
        rows.map((row, rid) => {
          return (
            <div key={`row-${rid}`} className="row">
              {row &&
                row.map((cell, cid) => {
                  return <div key={`row-${rid}-${cid}`} className={`cell ${numCells ===1 ? "cell-complete": ""}`}>
                    {cellLabel && <div className="cell-label">{cell.label}:</div>}
                    <div className="cell-value">{cell.value}</div>
                  </div>;
                })}
            </div>
          );
        })}
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Table;
