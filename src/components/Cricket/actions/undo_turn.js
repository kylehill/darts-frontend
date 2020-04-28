import { calculateScore } from "./common";

const undoStats = (playerStats, turn) => {
  let { darts, hits, marks } = playerStats;
  const turns = [...playerStats.turns];

  const turnMarks = turn.reduce((mem, dart) => {
    if (dart.miss) {
      return mem;
    }
    return mem + dart.eM;
  }, 0);

  const turnHits = turn.reduce((mem, dart) => {
    if (dart.miss) {
      return mem;
    }
    return mem + 1;
  }, 0);

  darts -= 3;
  marks -= turnMarks;
  hits -= turnHits;
  turns[turnMarks] -= 1;

  const mpr = (marks / darts) * 3 || 0;
  const hitRate = hits / darts || 0;

  return {
    darts,
    marks,
    hits,
    turns,
    mpr,
    hitRate,
  };
};

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
