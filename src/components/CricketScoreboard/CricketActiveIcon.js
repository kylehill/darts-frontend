import React from "react";

const CricketActiveIcon = ({ currentThrow, winner }) => {
  if (winner) {
    return null;
  }
  return <div className={`cricket-active-icon cricket-active-icon-${currentThrow}`}>▸</div>;
};

export default CricketActiveIcon;
