import React from "react";

import ActiveIcon from "components/ActiveIcon";
import X01Center from "./X01Center";
import X01Player from "./X01Player";

import "./index.scss";

const X01Scoreboard = ({ state }) => {
  return (
    <div className={`x01-scoreboard x01-scoreboard-players-${state.players.length}`}>
      <ActiveIcon currentThrow={state.currentThrow} winner={state.winner !== null} />
      <div className="x01-content">
        <X01Center title={state.title} />
        {state.players.map((player, idx) => {
          const lastTurn = state.priorTurns.filter((turn) => turn.throw === idx).pop();
          return (
            <X01Player
              key={idx}
              name={player.name}
              legs={state.legs[idx]}
              score={state.scores[idx]}
              winner={state.winner === idx}
              firstThrow={state.firstThrow === idx}
              lastTurn={lastTurn && lastTurn.score}
            />
          );
        })}
      </div>
    </div>
  );
};

export default X01Scoreboard;
