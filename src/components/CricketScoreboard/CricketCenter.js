import React from "react";

const CricketCenter = ({ title }) => {
  return (
    <div className="cricket-center">
      <div className="cricket-center-cell center-7">{title}</div>
      <div className="cricket-center-cell center-2">Legs</div>
      <div className="cricket-center-cell center-1">20</div>
      <div className="cricket-center-cell center-1">19</div>
      <div className="cricket-center-cell center-1">18</div>
      <div className="cricket-center-cell center-1">17</div>
      <div className="cricket-center-cell center-1">16</div>
      <div className="cricket-center-cell center-1">15</div>
      <div className="cricket-center-cell center-1">B</div>
      <div className="cricket-center-cell center-3">Points</div>
    </div>
  );
};

export default CricketCenter;
