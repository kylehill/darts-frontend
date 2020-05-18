import React from "react";
import ConfigDropdown from "components/ConfigDropdown";

const X01Config = ({ variants, setVariant }) => {
  return (
    <div className="setup-config-container">
      <p>
        {"Start a game of "}
        <ConfigDropdown
          name="target"
          value={variants.target || "501"}
          setValue={setVariant}
          optionsObject={{
            301: "301",
            401: "401",
            501: "501",
            701: "701",
            901: "901",
            1001: "1001",
          }}
        />
        .
      </p>
      <p>
        {"Players "}
        <ConfigDropdown
          name="start"
          value={variants.start || "single"}
          setValue={setVariant}
          optionsObject={{
            single: "don't need to double in",
            double: "need to double in",
          }}
        />
        {" and "}
        <ConfigDropdown
          name="end"
          value={variants.end || "double"}
          setValue={setVariant}
          optionsObject={{
            single: "don't need to double out",
            double: "need to double out",
          }}
        />
        .
      </p>
      <p>
        {"By default, this app tracks attempts at doubling in and out. "}
        <ConfigDropdown
          name="trackDoubles"
          value={variants.trackDoubles || "yes"}
          setValue={setVariant}
          optionsObject={{
            yes: "Keep that enabled.",
            no: "Disable double tracking.",
          }}
        />
      </p>
    </div>
  );
};

export default X01Config;

const defaultVariants = {
  target: "501",
  teams: "singles",
  start: "single",
  end: "double",
  trackDoubles: "yes",
};

const newPlayerStats = () => ({
  all: { darts: 0, points: 0 },
  f9: { darts: 0, points: 0 },
  turns: {},
  checkouts: [],
  doubleIn: { misses: 0, hits: 0 },
  doubleOut: { misses: 0, hits: 0 },
});

export const initializeX01 = (state, roomCode) => {
  const variants = { ...defaultVariants, ...state.variants };
  const legs = state.players.map((_) => 0);
  const scores = state.players.map((_) => Number(variants.target));
  const stats = state.players.map((_) => newPlayerStats());

  return {
    legs,
    stats,
    scores,
    variants,
    roomCode,
    isActive: true,
    tx: 0,
    game: "x01",
    players: state.players,
    firstThrow: 0,
    currentThrow: 0,
    priorTurns: [],
    priorLegs: [],
    currentTurn: {
      score: "",
      doubleDart: false,
    },
    winner: null,
    title: `Room Code: ${roomCode}`,
  };
};
