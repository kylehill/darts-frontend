import React from "react";
import Cricket from "components/Cricket";
import X01 from "components/X01";

const ActiveGameDisplay = ({ state, updateState }) => {
  switch (state.game) {
    case "x01":
      return <X01 state={state} updateState={updateState} />;

    case "cricket":
    default:
      return <Cricket state={state} updateState={updateState} />;
  }
};

export default ActiveGameDisplay;
