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

const CricketName = ({ value, changeName }) => {
  return (
    <input className="cricket-name" value={value} onChange={(e) => changeName(e.target.value)} />
  );
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

const cpuIcon = (cpu) => {
  switch (cpu) {
    case "easy":
      return "💻";
    case "medium":
      return "🤖";
    case "hard":
      return "👾";
    default:
      return "";
  }
};

const CricketPlayer = ({
  changeName,
  cpu,
  name,
  marks,
  points,
  legs,
  firstThrow,
  trailing,
  winner,
}) => {
  return (
    <div className="cricket-player">
      <div className={`cricket-cell cricket-nameplate ${winner ? "cricket-winner" : ""}`}>
        {cpu && <span className="cricket-cpu-icon">{cpuIcon(cpu)}</span>}
        {changeName && <CricketName changeName={changeName} value={name} />}
        {!changeName && name}
        {firstThrow && <div className="cricket-leader" title="Throwing first this leg"></div>}
      </div>
      <div className="cricket-cell cricket-legs">{legs}</div>
      {marks.map((marks, idx) => {
        return <CricketMarkCell key={idx} marks={marks} sector={idx} />;
      })}
      <div className={`cricket-cell cricket-points ${trailing ? "cricket-points-trailing" : ""}`}>
        {points}
      </div>
    </div>
  );
};

export default CricketPlayer;
