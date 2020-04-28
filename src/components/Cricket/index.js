import React from "react";

import CricketScoreboard from "components/CricketScoreboard";
import CricketActions from "components/CricketActions";

import reducerFn from "./reducer";

const Cricket = (props) => {
  const [state, _wrappedDispatch] = React.useReducer(reducerFn, props.state);

  React.useEffect(() => {
    props.state && _wrappedDispatch({ type: "update_state", state: props.state });
  }, [props.state]);

  const dispatch = (action) => {
    const newState = reducerFn(state, action);
    props.updateState(newState);
    _wrappedDispatch(action);
  };

  const clickDart = (dart) => {
    dispatch({ type: "click_dart", dart });
  };

  const clickBack = () => {
    dispatch({ type: "click_back" });
  };

  const clickNext = () => {
    dispatch({ type: "click_next" });
  };

  return (
    <div className="cricket-container">
      <CricketScoreboard state={state} />
      <CricketActions state={state} clickDart={clickDart} clickBack={clickBack} clickNext={clickNext} />
    </div>
  );
};

export default Cricket;
