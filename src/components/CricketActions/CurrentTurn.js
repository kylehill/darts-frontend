import React from "react";

const CurrentTurn = ({ spectating, throwerName, throwerTeam, darts, clickBack, clickNext }) => {
  darts = Array.from(Array(3), (_, idx) => darts[idx] || { miss: true });

  return (
    <div className="cricket-current">
      <div className={`cricket-current-thrower cricket-current-thrower-${throwerTeam}`}>
        <strong>Current Turn:</strong> {throwerName}
      </div>
      {!spectating && (
        <button className="cricket-current-button cricket-current-back" onClick={clickBack}>
          Back
        </button>
      )}
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
      {!spectating && (
        <button className="cricket-current-button cricket-current-next" onClick={clickNext}>
          Next
        </button>
      )}
    </div>
  );
};

export default CurrentTurn;
