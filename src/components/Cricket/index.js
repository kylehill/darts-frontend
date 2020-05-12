import React from "react";

import SpectateMode from "components/SpectateMode";
import CricketScoreboard from "components/CricketScoreboard";
import CricketActions from "components/CricketActions";
import CricketTabs from "components/CricketTabs";

import reducerFn from "./reducer";

import { timeout } from "lib";

import simulateDart from "./simulateDart";

import "./index.scss";

const TIMEOUT_MS = 500;

const simulateTurn = async (state, dispatch) => {
  for (let i = state.currentTurn.length; i < 3; i++) {
    await timeout(TIMEOUT_MS);
    dispatch({
      type: "click_dart",
      dart: simulateDart(state),
    });
  }

  await timeout(TIMEOUT_MS);
  dispatch({ type: "click_next" });
};

const Cricket = (props) => {
  const [state, _wrappedDispatch] = React.useReducer(reducerFn, props.state);
  const [isSpectating, setIsSpectating] = React.useState(false);

  React.useEffect(() => {
    props.state && _wrappedDispatch({ type: "update_state", state: props.state });
  }, [props.state]);

  React.useEffect(() => {
    window.document.title = `[${state.roomCode}] ${state.players[0].name} ${state.legs[0]}-${state.legs[1]} ${state.players[1].name}`;
  }, [state.roomCode, state.players, state.legs]);

  React.useEffect(() => {
    const keyListener = (e) => {
      switch (e.code) {
        case "Enter":
          e.preventDefault();
          dispatch({ type: "key_enter" });
          return;

        case "Backspace":
          dispatch({ type: "key_backspace" });
          return;

        default:
          return;
      }
    };

    window.addEventListener("keydown", keyListener);

    return () => window.removeEventListener("keydown", keyListener);
  });

  const _controlledDispatch = (action) => {
    if (isSpectating) {
      return;
    }

    const newState = reducerFn(state, action);
    if (!newState) {
      return;
    }

    props.updateState(newState);
    _wrappedDispatch(action);
  };

  const dispatch = (action) => {
    if (state.cpuControl) {
      return;
    }

    _controlledDispatch(action);
  };

  React.useEffect(() => {
    if (state.cpuControl) {
      simulateTurn(state, _controlledDispatch);
    }
  }, [state.cpuControl, state.winner, state.currentThrow]);

  return (
    <div className="cricket-container">
      <div className="cricket-spectate-container">
        <SpectateMode
          spectating={isSpectating}
          clickChange={() => setIsSpectating(!isSpectating)}
        />
      </div>
      <div className="cricket-scoreboard-container">
        <CricketScoreboard
          spectating={isSpectating}
          state={state}
          changeName={(name, player) => dispatch({ type: "change_name", name, player })}
        />
      </div>
      <div className="cricket-actions-container">
        <CricketActions
          spectating={isSpectating}
          state={state}
          clickDart={(dart) => dispatch({ type: "click_dart", dart })}
          clickBack={() => dispatch({ type: "click_back" })}
          clickNext={() => dispatch({ type: "click_next" })}
        />
      </div>
      <div className="cricket-tabs-container">
        <CricketTabs
          state={state}
          spectating={isSpectating}
          changeFirstThrow={(firstThrow) =>
            dispatch({ type: "click_change_first_throw", firstThrow })
          }
          restartLeg={() => dispatch({ type: "click_restart_leg" })}
          restartMatch={() => dispatch({ type: "click_restart_match" })}
        />
      </div>
    </div>
  );
};

export default Cricket;
