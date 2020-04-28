import React from "react";

import "./index.scss";

const convert = (text) => {
  console.log({ text });
  return text
    .split("-")
    .map((word) => {
      console.log(word);
      return word[0].toUpperCase() + word.split("").slice(1).join("").toLowerCase();
    })
    .join(" ");
};

const VariantList = ({ variants }) => {
  if (Object.keys(variants).length === 0) {
    return null;
  }

  return (
    <div className="cricket-menu-variants">
      {Object.entries(variants).map(([key, value]) => {
        return (
          <p>
            <strong>{convert(key)}:</strong> {convert(value)}
          </p>
        );
      })}
    </div>
  );
};

const CricketMenu = ({ state }) => {
  return (
    <div className="cricket-menu">
      <VariantList variants={state.variants} />
      <a href="/">Select a different room</a>
    </div>
  );
};

export default CricketMenu;
