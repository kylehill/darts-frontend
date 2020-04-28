import React from "react";

const SectorRow = ({ sector, display, closed, isBull, clickDart }) => {
  return (
    <div className={`cricket-sector ${closed ? "cricket-sector-closed" : ""}`}>
      <div className="cricket-sector-label">{display}</div>
      <div className="cricket-sector-buttons">
        <button
          className="cricket-button cricket-button-single"
          onClick={() => {
            clickDart({ sector, multiple: 1, display: `${display}` });
          }}
        >
          {`${display}`}
        </button>

        <button
          className="cricket-button cricket-button-double"
          onClick={() => {
            clickDart({ sector, multiple: 2, display: `D${display}` });
          }}
        >
          {`D${display}`}
        </button>

        {!isBull && (
          <button
            className="cricket-button cricket-button-treble"
            onClick={() => {
              clickDart({ sector, multiple: 3, display: `T${display}` });
            }}
          >
            {`T${display}`}
          </button>
        )}
      </div>
    </div>
  );
};

export default SectorRow;
