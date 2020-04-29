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

const DangerOption = ({ action, title, description }) => {
  return (
    <div className="danger-option">
      <div className="danger-description">{description}</div>
      <button onClick={action} className="danger-title">
        {title}
      </button>
    </div>
  );
};

const DangerOptions = ({ state, changeFirstThrow, restartMatch, restartLeg }) => {
  return (
    <div className="cricket-menu-danger">
      <DangerOption
        title="Change First Thrower"
        description="Changes the first thrower for this leg. Restarts any leg in progress."
        action={() => changeFirstThrow((state.firstThrow + 1) % 2)}
      />

      <DangerOption title="Restart Leg" description="Restarts this leg from the beginning." action={restartLeg} />

      <DangerOption title="Restart Match" description="Restarts this match from the beginning." action={restartMatch} />
    </div>
  );
};

const CricketMenu = ({ state, changeFirstThrow, restartMatch, restartLeg, spectating }) => {
  return (
    <div className="cricket-menu">
      <VariantList variants={state.variants} />
      {!spectating && (
        <DangerOptions
          state={state}
          changeFirstThrow={changeFirstThrow}
          restartMatch={restartMatch}
          restartLeg={restartLeg}
        />
      )}
    </div>
  );
};

export default CricketMenu;
