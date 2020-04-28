import React from "react";

import SectorRow from "./SectorRow";
import CurrentTurn from "./CurrentTurn";

import "./index.scss";

const CricketActions = ({ state, clickBack, clickNext, clickDart }) => {
  return (
    <div className="cricket-actions">
      {["20", "19", "18", "17", "16", "15", "B"].map((display, idx) => {
        const closed = state.scores[0].marks[idx] >= 3 && state.scores[1].marks[idx] >= 3;
        const isBull = display === "B";
        return (
          <SectorRow key={idx} sector={idx} closed={closed} display={display} isBull={isBull} clickDart={clickDart} />
        );
      })}

      <CurrentTurn
        throwerName={state.players[state.currentThrow].name}
        clickBack={clickBack}
        clickNext={clickNext}
        darts={state.currentTurn}
      />
    </div>
  );
};

export default CricketActions;
