import React from "react";

import RoomSelect from "../RoomSelect";
import ActiveGameDisplay from "../ActiveGameDisplay";

import "./index.scss";

const applicationReducer = (state, action) => {
  switch (action.type) {
    case "update_state":
      return action.state;

    default:
      return state;
  }
};

const init = () => ({
  tx: 0,
  isActive: false,
  game: null,
  variants: null,
});

const App = (props) => {
  const [appState, dispatch] = React.useReducer(applicationReducer, {}, init);

  React.useEffect(() => {
    if (props.state) {
      dispatch({ type: "update_state", state: props.state });
    }
  }, [props.state]);

  return (
    <div className="app-container">
      <div className="app-content">
        {appState.isActive ? (
          <ActiveGameDisplay state={appState} updateState={props.sendState} />
        ) : (
          <RoomSelect
            checkRoom={props.checkRoom}
            roomStatus={props.roomStatus}
            joinRoom={props.joinRoom}
            createRoom={props.createRoom}
          />
        )}
      </div>
    </div>
  );
};

export default App;
