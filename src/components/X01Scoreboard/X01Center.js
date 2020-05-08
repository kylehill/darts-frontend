import React from "react";

const X01Center = ({ title }) => {
  return (
    <div className="x01-center">
      <div className="x01-center-cell center-11">{title}</div>
      <div className="x01-center-cell center-2">Legs</div>
      <div className="x01-center-cell center-3">Points</div>
      <div className="x01-center-cell x01-center-cell-noborder center-1"></div>
      <div className="x01-center-cell center-2">Last Turn</div>
    </div>
  );
};

export default X01Center;
