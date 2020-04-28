import React from "react";

const sectors = ["20", "19", "18", "17", "16", "15", "B"];

const cellText = (marks, sector) => {
  switch (marks) {
    case 0:
      return sectors[sector];

    case 1:
      return "/";

    case 2:
      return "X";

    case 3:
    default:
      return "✓";
  }
};

const CricketMarkCell = ({ marks, sector }) => {
  const text = cellText(marks, sector);
  return (
    <div
      className={`cricket-cell cricket-marks ${marks >= 3 ? "cricket-marks-complete" : ""} ${
        marks === 0 ? "cricket-marks-empty" : ""
      }`}
    >
      {text}
    </div>
  );
};

const CricketPlayer = ({ name, marks, points, legs, firstThrow, trailing, winner }) => {
  return (
    <div className="cricket-player">
      <div className={`cricket-cell cricket-nameplate ${winner ? "cricket-winner" : ""}`}>
        <div className="cricket-name">{name}</div>
        {firstThrow && <div className="cricket-leader"></div>}
      </div>
      <div className="cricket-cell cricket-legs">{legs}</div>
      {marks.map((marks, idx) => {
        return <CricketMarkCell key={idx} marks={marks} sector={idx} />;
      })}
      <div className={`cricket-cell cricket-points ${trailing ? "cricket-points-trailing" : ""}`}>{points}</div>
    </div>
  );
};

export default CricketPlayer;
