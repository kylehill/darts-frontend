import React from "react";
import Cricket from "components/Cricket";

const ActiveGameDisplay = ({ state, updateState }) => {
  switch (state.game) {
    case "cricket":
      return <Cricket state={state} updateState={updateState} />;
  }
};

export default ActiveGameDisplay;
