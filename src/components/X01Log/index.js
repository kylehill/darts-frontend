import React from "react";

import "./index.scss";

const PriorLeg = ({ number, winner, isBreak, checkout }) => {
  return (
    <div className="x01-log-leg">
      <div className="x01-log-number">Leg {number}</div>
      <div className="x01-log-winner">Winner: {winner}</div>
      {isBreak && <div className="x01-log-break">Break</div>}
      <div className="x01-log-checkout">Checkout: {checkout}</div>
    </div>
  );
};

const scoreColor = (score) => {
  if (score < 40) {
    return "red";
  }

  if (score >= 170) {
    return "gold";
  }

  if (score >= 130) {
    return "blue";
  }

  if (score >= 90) {
    return "purple";
  }
};

const PriorTurn = ({ name, round, score, thrower, remaining }) => {
  return (
    <div className={`x01-log-turn ${remaining[thrower] === 0 ? "x01-log-turn-winner" : ""}`}>
      <div className="x01-log-round">
        {name}, Turn {round}
      </div>
      <div className={`x01-log-score x01-log-score-${scoreColor(score)}`}>{score}</div>
      <div className="x01-log-scores">
        {remaining.map((score, idx) => {
          return (
            <div
              key={idx}
              className={`x01-log-remaining x01-log-remaining-${color(idx)} ${
                thrower === idx ? "x01-log-remaining-active" : ""
              }`}
            >
              {score}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const color = (team) => {
  switch (team) {
    case 0:
      return "red";
    case 1:
      return "blue";
    case 2:
      return "green";
    case 3:
      return "orange";
    case 4:
      return "purple";
    case 5:
      return "pink";
    default:
      return "";
  }
};

const X01Log = ({ state }) => {
  const turns = [...state.priorTurns].reverse();
  const legs = [...state.priorLegs].reverse();

  return (
    <div className="x01-log">
      {turns.map((turn, idx) => {
        return (
          <PriorTurn
            key={idx}
            name={state.players[turn.throw].name}
            round={turn.round + 1}
            score={turn.score}
            remaining={turn.remaining}
            thrower={turn.throw}
          />
        );
      })}
      {legs.map((leg, idx) => {
        return (
          <PriorLeg
            key={idx}
            idx={idx}
            number={idx + 1}
            winner={state.players[leg.winner].name}
            isBreak={leg.break}
            checkout={leg.turns[leg.winner].slice(-1)[0]}
          />
        );
      })}
    </div>
  );
};

export default X01Log;
