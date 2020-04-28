import React from "react";

import "./index.scss";

const SpectateMode = ({ spectating, clickChange }) => {
  return (
    <div className="spectate-mode">
      {spectating && (
        <div className="spectate-copy">
          You are currently <strong>spectating</strong>.
          <br />
          Click the button to the right to switch to scoring mode.
        </div>
      )}

      {!spectating && (
        <div className="spectate-copy">
          You are currently <strong>scoring</strong> and can mark the scoreboard.
          <br />
          Click the button to the right to switch to spectate mode.
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
