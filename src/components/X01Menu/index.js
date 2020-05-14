import React from "react";
import { fromCamelCase } from "lib";

import "./index.scss";

const VariantList = ({ variants }) => {
  return (
    <div className="x01-menu-variants">
      <p>
        <strong>Target:</strong> {variants.target}
      </p>
      {variants.trackDoubles === "yes" && (
        <>
          <p>
            <strong>Double In:</strong> {variants.start === "double" ? "Yes" : "No"}
          </p>
          <p>
            <strong>Double Out:</strong> {variants.end === "double" ? "Yes" : "No"}
          </p>
        </>
      )}
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
    <div className="x01-menu-danger">
      <DangerOption
        title="Change First Thrower"
        description="Changes the first thrower for this leg. Restarts any leg in progress."
        action={() => changeFirstThrow((state.firstThrow + 1) % state.players.length)}
      />

      <DangerOption
        title="Restart Leg"
        description="Restarts this leg from the beginning."
        action={restartLeg}
      />

      <DangerOption
        title="Restart Match"
        description="Restarts this match from the beginning."
        action={restartMatch}
      />
    </div>
  );
};

const X01Menu = ({ state, changeFirstThrow, restartMatch, restartLeg, spectating }) => {
  return (
    <div className="x01-menu">
      <VariantList variants={state.variants} />
      <a href="/">Select (or create) a new room</a>
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

export default X01Menu;
