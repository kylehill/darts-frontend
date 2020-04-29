import React from "react";
import ConfigDropdown from "components/ConfigDropdown";

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
      {", with the players organized as "}
      <ConfigDropdown
        name="teams"
        value={variants.teams || "singles"}
        setValue={setVariant}
        optionsObject={{
          singles: "Singles",
        }}
      />
      .
    </div>
  );
};

const newScoreObject = () => ({
  points: 0,
  marks: [0, 0, 0, 0, 0, 0, 0],
});

export const initializeCricket = (state, roomCode) => {
  const legs = state.players.map((_) => 0);
  const stats = state.players.map((_) => ({
    darts: 0,
    hits: 0,
    marks: 0,
    mpr: 0,
    hitRate: 0,
    turns: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  }));

  const scores = [newScoreObject(), newScoreObject()];

  return {
    legs,
    stats,
    scores,
    roomCode,
    isActive: true,
    tx: 0,
    game: "cricket",
    players: state.players,
    variants: state.variants,
    firstThrow: 0,
    currentThrow: 0,
    priorTurns: [],
    priorLegs: [],
    currentTurn: [],
    winner: null,
    title: "",
  };
};

export default CricketConfig;
