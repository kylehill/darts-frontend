import React from "react";

import "./index.scss";

const StatTable = ({ table }) => {
  return (
    <table className="stat-table">
      <thead>
        <tr>
          {table.header.map((cell, idx) => {
            return <th key={idx}>{cell}</th>;
          })}
        </tr>
      </thead>

      <tbody>
        {table.rows.map((row, idx) => {
          return (
            <tr key={idx}>
              {row.map((cell, idx) => {
                return <td key={idx}>{cell}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const StatSheet = ({ tables }) => {
  return (
    <div className="stat-sheet">
      {tables.map((table, idx) => {
        return <StatTable table={table} key={idx} />;
      })}
    </div>
  );
};

export default StatSheet;
