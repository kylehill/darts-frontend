import React from "react";

import SpectateMode from "components/SpectateMode";

import reducerFn from "./reducer";

import "./index.scss";

const X01 = (props) => {
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
    if (!newState) {
      return;
    }

    props.updateState(newState);
    _wrappedDispatch(action);
  };

  return (
    <div className="x01-container">
      <div className="x01-spectate-container">
        <SpectateMode spectating={isSpectating} clickChange={() => setIsSpectating(!isSpectating)} />
      </div>
    </div>
  );
};

export default X01;
