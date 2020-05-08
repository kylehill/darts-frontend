import React from "react";

import "./index.scss";

const ActiveIcon = ({ currentThrow, winner }) => {
  if (winner) {
    return null;
  }
  return <div className={`active-icon active-icon-${currentThrow}`}>▸</div>;
};

export default ActiveIcon;
