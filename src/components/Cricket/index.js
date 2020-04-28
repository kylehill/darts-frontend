import React from "react";

import SpectateMode from "components/SpectateMode";
import CricketScoreboard from "components/CricketScoreboard";
import CricketActions from "components/CricketActions";
import CricketTabs from "components/CricketTabs";

import reducerFn from "./reducer";

import "./index.scss";

const Cricket = (props) => {
  const [state, _wrappedDispatch] = React.useReducer(reducerFn, props.state);
  const [isSpectating, setIsSpectating] = React.useState(false);

  React.useEffect(() => {
    props.state && _wrappedDispatch({ type: "update_state", state: props.state });
  }, [props.state]);

  React.useEffect(() => {
    window.document.title = `${state.players[0].name} ${state.legs[0]}-${state.legs[1]} ${state.players[1].name}`;
  }, [state.players, state.legs]);

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

  const dispatch = (action) => {
    if (isSpectating) {
      return;
    }

    const newState = reducerFn(state, action);
    props.updateState(newState);
    _wrappedDispatch(action);
  };

  const clickDart = (dart) => {
    console.log("click Dart");
    dispatch({ type: "click_dart", dart });
  };

  const clickBack = () => {
    dispatch({ type: "click_back" });
  };

  const clickNext = () => {
    dispatch({ type: "click_next" });
  };

  const clickSpectate = () => {
    setIsSpectating(!isSpectating);
  };

  return (
    <div className="cricket-container">
      <div className="cricket-spectate-container">
        <SpectateMode spectating={isSpectating} clickChange={clickSpectate} />
      </div>
      <div className="cricket-scoreboard-container">
        <CricketScoreboard state={state} />
      </div>
      <div className="cricket-actions-container">
        <CricketActions
          spectating={isSpectating}
          state={state}
          clickDart={clickDart}
          clickBack={clickBack}
          clickNext={clickNext}
        />
      </div>
      <div className="cricket-tabs-container">
        <CricketTabs state={state} />
      </div>
    </div>
  );
};

export default Cricket;
