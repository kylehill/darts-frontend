import React from "react";
import ConfigDropdown from "components/ConfigDropdown";

import createCricketState from "lib/createCricketState";

const CricketConfig = ({ variants, setVariant }) => {
  return (
    <div className="setup-config-container">
      {"Start a game of "}
      <ConfigDropdown
        name="format"
        value={variants.format || "standard"}
        setValue={setVariant}
        optionsObject={{
          standard: "Standard Cricket",
          "no-points": "Cricket, No Points",
        }}
      />
      .
    </div>
  );
};

export const initializeCricket = (state, roomCode) => {
  return createCricketState({
    roomCode,
    players: state.players,
    variants: state.variants,
    title: "",
  });
};

export default CricketConfig;
