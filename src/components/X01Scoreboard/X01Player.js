import React from "react";

const X01Player = ({ name, legs, score, winner, firstThrow, lastTurn }) => {
  return (
    <div className="x01-player">
      <div className={`x01-cell x01-nameplate ${winner ? "x01-winner" : ""}`}>
        {name}
        {firstThrow && <div className="x01-leader" title="Throwing first this leg"></div>}
      </div>
      <div className="x01-cell x01-legs">{legs}</div>
      <div className="x01-cell x01-points">{score}</div>
      <div className="x01-cell x01-last-turn">{lastTurn}</div>
    </div>
  );
};

export default X01Player;
