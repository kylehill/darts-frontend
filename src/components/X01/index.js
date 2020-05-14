import React from "react";

import SpectateMode from "components/SpectateMode";
import X01Scoreboard from "components/X01Scoreboard";
import X01Actions from "components/X01Actions";
import X01Tabs from "components/X01Tabs";

import reducerFn from "./reducer";

import "./index.scss";

const X01 = (props) => {
  const [state, _wrappedDispatch] = React.useReducer(reducerFn, props.state);
  const [isSpectating, setIsSpectating] = React.useState(false);
  const inputElement = React.useRef(null);

  React.useEffect(() => {
    props.state && _wrappedDispatch({ type: "update_state", state: props.state });
  }, [props.state]);

  React.useEffect(() => {
    if (state.players.length !== 2) {
      window.document.title = `[${state.roomCode}] Live Darts Scoring`;
      return;
    }

    window.document.title = `[${state.roomCode}] ${state.players[0].name} ${state.legs[0]}-${state.legs[1]} ${state.players[1].name}`;
  }, [state.roomCode, state.players, state.legs]);

  React.useEffect(() => {
    const keyListener = (e) => {
      switch (e.code) {
        case "Digit0":
        case "Digit1":
        case "Digit2":
        case "Digit3":
        case "Digit4":
        case "Digit5":
        case "Digit6":
        case "Digit7":
        case "Digit8":
        case "Digit9":
          if (document.activeElement !== inputElement.current) {
            inputElement.current.focus();
            dispatch({ type: "key_number", digit: e.key });
          }
          return;

        case "Enter":
          e.preventDefault();
          dispatch({ type: "key_enter" });
          return;

        default:
          return;
      }
    };

    window.addEventListener("keyup", keyListener);

    return () => window.removeEventListener("keyup", keyListener);
  });

  const dispatch = (action) => {
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

  return (
    <div className="x01-container">
      <div className="x01-spectate-container">
        <SpectateMode
          spectating={isSpectating}
          clickChange={() => setIsSpectating(!isSpectating)}
        />
      </div>
      <div className="x01-scoreboard-container">
        <X01Scoreboard
          spectating={isSpectating}
          state={state}
          changeName={(name, player) => dispatch({ type: "change_name", name, player })}
        />
      </div>
      <div className="x01-actions-container">
        <X01Actions
          spectating={isSpectating}
          state={state}
          changeScore={(score) => dispatch({ type: "change_score", score })}
          clickDouble={(double) => dispatch({ type: "click_double", double })}
          clickNext={() => dispatch({ type: "click_next" })}
          clickBack={() => dispatch({ type: "click_back" })}
          inputRef={inputElement}
        />
      </div>
      <div className="x01-tabs-container">
        <X01Tabs
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

export default X01;
