import { newStats, newScores } from "./common";

export default (state, action) => {
  return {
    ...state,
    tx: state.tx + 1,

    legs: [0, 0],
    stats: newStats(),
    scores: newScores(),
    firstThrow: 0,
    currentThrow: 0,
    priorTurns: [],
    priorLegs: [],
    currentTurn: [],
    winner: null,
  };
};
