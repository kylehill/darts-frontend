import React from "react";

import "./index.scss";

const LastTurn = ({ state }) => {
  if (state.priorTurns.length === 0) {
    return <div className="last-turn"></div>;
  }

  const lastTurn = state.priorTurns[state.priorTurns.length - 1];
  const player = state.players[(state.currentThrow + 1) % state.players.length].name;

  switch (state.game) {
    case "cricket":
      const darts = lastTurn
        .filter((d) => d.eM)
        .map((d) => d.display)
        .join(", ");
      const marks = lastTurn.reduce((mem, d) => mem + (d.eM || 0), 0);
      return (
        <div className="last-turn">
          <strong>Last Turn: </strong>
          {player} ({darts.length ? `${darts} -- ` : ""}
          {marks} mark{marks === 1 ? "" : "s"})
        </div>
      );

    case "x01":
      return (
        <div className="last-turn">
          <strong>Last Turn: </strong>
          {player} ({lastTurn.score})
        </div>
      );

    default:
      return <div className="last-turn"></div>;
  }
};

export default LastTurn;
