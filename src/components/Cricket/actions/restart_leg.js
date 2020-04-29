import { newScores, undoStats } from "./common";

export default (state, action) => {
  const stats = state.priorTurns.reduce((mem, turn, idx) => {
    const team = (state.firstThrow + idx) % 2;

    return mem.map((playerStats, idx) => {
      if (idx === team) {
        return undoStats(playerStats, turn);
      }
      return playerStats;
    });
  }, state.stats);

  return {
    ...state,
    tx: state.tx + 1,
    stats,
    currentThrow: state.firstThrow,
    currentTurn: [],
    priorTurns: [],
    scores: newScores(),
    winner: null,
  };
};
