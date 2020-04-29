import { calculateScore, undoStats } from "./common";

export default (state, action) => {
  if (state.priorTurns.length === 0) {
    return state;
  }

  const active = {
    points: state.scores[(state.currentThrow + 1) % 2].points,
    marks: [...state.scores[(state.currentThrow + 1) % 2].marks],
  };

  const lastTurn = state.priorTurns.slice(-1)[0];
  const lastTurnDarts = lastTurn.filter((dart) => dart.miss !== true);
  lastTurnDarts.forEach((dart) => {
    active.marks[dart.sector] -= dart.eM;
  });

  active.points = calculateScore(state.variants.format, active.marks);

  const scores = state.scores.map((score, idx) => {
    if (idx !== state.currentThrow) {
      return active;
    }

    return score;
  });

  const stats = state.stats.map((playerStats, idx) => {
    if (idx !== state.currentThrow) {
      return undoStats(playerStats, lastTurn);
    }

    return playerStats;
  });

  return {
    ...state,
    tx: state.tx + 1,
    priorTurns: state.priorTurns.slice(0, -1),
    currentTurn: lastTurnDarts,
    currentThrow: (state.currentThrow + 1) % 2,
    scores,
    stats,
    winner: null,
  };
};
