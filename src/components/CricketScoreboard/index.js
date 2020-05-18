import React from "react";

import ActiveIcon from "components/ActiveIcon";
import CricketPlayer from "./CricketPlayer";
import CricketCenter from "./CricketCenter";
import LastTurn from "components/LastTurn";

import "./index.scss";

const CricketScoreboard = ({ spectating, state, changeName }) => {
  return (
    <div className="cricket-scoreboard">
      <ActiveIcon currentThrow={state.currentThrow} winner={state.winner !== null} />
      <div className="cricket-content">
        <CricketCenter title={state.title} />
        <CricketPlayer
          changeName={!spectating && ((name) => changeName(name, 0))}
          name={state.players[0].name}
          cpu={state.players[0].cpu}
          marks={state.scores[0].marks}
          points={state.scores[0].points}
          legs={state.legs[0]}
          firstThrow={state.firstThrow === 0}
          trailing={state.scores[0].points < state.scores[1].points}
          winner={state.winner === 0}
        />
        <CricketPlayer
          changeName={!spectating && ((name) => changeName(name, 1))}
          name={state.players[1].name}
          cpu={state.players[1].cpu}
          marks={state.scores[1].marks}
          points={state.scores[1].points}
          legs={state.legs[1]}
          firstThrow={state.firstThrow === 1}
          trailing={state.scores[0].points > state.scores[1].points}
          winner={state.winner === 1}
        />
        <LastTurn state={state} />
      </div>
    </div>
  );
};

export default CricketScoreboard;
