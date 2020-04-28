import React from "react";

const CurrentTurn = ({ throwerName, darts, clickBack, clickNext }) => {
  darts = Array.from(Array(3), (_, idx) => darts[idx] || { miss: true });

  return (
    <div className="cricket-current">
      <button className="cricket-current-button cricket-current-back" onClick={clickBack}>
        Back
      </button>
      {darts.map((dart, idx) => {
        return (
          <div
            className={`cricket-current-dart ${dart.multiple ? `cricket-current-dart-${dart.multiple}` : ""}`}
            key={idx}
          >
            {dart.display}
          </div>
        );
      })}
      <button className="cricket-current-button cricket-current-next" onClick={clickNext}>
        Next
      </button>
    </div>
  );
};

export default CurrentTurn;
