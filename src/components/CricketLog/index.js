import React from "react";

import "./index.scss";

const PriorLeg = ({ number, winner, isBreak, scores }) => {
  return (
    <div className="cricket-log-leg">
      <div className="cricket-log-number">Leg {number}</div>
      <div className="cricket-log-winner">Winner: {winner}</div>
      {isBreak && <div className="cricket-log-break">Break</div>}
      <div className="cricket-log-scores">
        {scores[0]} - {scores[1]}
      </div>
    </div>
  );
};

const PriorTurn = ({ darts, name, round }) => {
  const marks = darts.reduce((mem, dart) => mem + dart.eM, 0);
  const bulls = darts.filter((dart) => dart.sector === 6).reduce((mem, dart) => mem + dart.eM, 0);

  return (
    <div className="cricket-log-turn">
      <div className="cricket-log-round">
        {name}, Turn {round}
      </div>
      {marks >= 4 && <div className="cricket-log-marks">{marks} Marks</div>}
      {marks < 4 && bulls >= 2 && <div className="cricket-log-bulls">{bulls} Bulls</div>}
      <div className="cricket-log-darts">
        {darts.map((dart, idx) => {
          if (dart.miss) {
            return <div className="cricket-log-dart cricket-log-dart-miss"></div>;
          }
          return <div className={`cricket-log-dart cricket-log-dart-${dart.multiple}`}>{dart.display}</div>;
        })}
      </div>
    </div>
  );
};

const CricketLog = ({ state }) => {
  const turns = [...state.priorTurns].reverse();
  const legs = [...state.priorLegs].reverse();

  return (
    <div className="cricket-log">
      {turns.map((turn, idx) => {
        return (
          <PriorTurn
            key={idx}
            round={Math.ceil((turns.length - idx) / 2)}
            darts={turn}
            name={state.players[(state.firstThrow + idx) % 2].name}
          />
        );
      })}
      {legs.map((leg, idx) => {
        return (
          <PriorLeg
            number={legs.length - idx}
            winner={state.players[leg.winner].name}
            scores={leg.score}
            isBreak={leg.break}
            key={idx}
          />
        );
      })}
    </div>
  );
};

export default CricketLog;
