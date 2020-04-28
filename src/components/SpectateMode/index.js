import React from "react";

import "./index.scss";

const SpectateMode = ({ spectating, clickChange }) => {
  return (
    <div className="spectate-mode">
      {spectating && (
        <div className="spectate-copy">
          You are currently <strong>spectating</strong>.<br />
          You can't change the game state for other people.
        </div>
      )}

      {!spectating && (
        <div className="spectate-copy">
          You are currently <strong>scoring</strong>.<br />
          Changing the game state will change it for everyone.
        </div>
      )}
      <button
        className={`spectate-button spectate-button-${spectating ? "spectating" : "scoring"}`}
        onClick={clickChange}
      >
        {spectating ? "👀" : "🎯"}
      </button>
    </div>
  );
};

export default SpectateMode;
