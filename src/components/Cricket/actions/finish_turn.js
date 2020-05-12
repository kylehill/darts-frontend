import { calculateScore, calculateStats } from "./common";

const addStats = (playerStats, turn) => {
  let { darts, hits, marks } = playerStats;
  const turns = [...playerStats.turns];

  const turnMarks = turn.reduce((mem, dart) => {
    if (dart.miss) {
      return mem;
    }
    return mem + dart.eM;
  }, 0);

  const turnHits = turn.reduce((mem, dart) => {
    if (dart.miss || dart.eM === 0) {
      return mem;
    }
    return mem + 1;
  }, 0);

  darts += 3;
  marks += turnMarks;
  hits += turnHits;
  turns[turnMarks] += 1;

  return calculateStats({ darts, marks, hits, turns });
};

const checkWinner = (format, scores) => {
  if (format === "test") {
    if (scores[0].points >= 4) {
      return 0;
    }
    if (scores[1].points >= 4) {
      return 1;
    }
    return null;
  }

  if (scores[0].marks.every((sector) => sector >= 3)) {
    if (scores[0].points >= scores[1].points) {
      return 0;
    }
  }
  if (scores[1].marks.every((sector) => sector >= 3)) {
    if (scores[1].points >= scores[0].points) {
      return 1;
    }
  }
  return null;
};

export default (state, action) => {
  const format = state.variants.format || "standard";

  const active = {
    points: state.scores[state.currentThrow].points,
    marks: [...state.scores[state.currentThrow].marks],
  };
  const opponent = state.scores[(state.currentThrow + 1) % 2];

  const currentTurn = Array.from(Array(3), (_, idx) => {
    const dart = state.currentTurn[idx];
    if (dart === undefined || dart === null) {
      return { miss: true, eM: 0 };
    }

    if (opponent.marks[dart.sector] >= 3 || format === "no-points") {
      const eM = Math.min(dart.multiple, 3 - Math.min(3, active.marks[dart.sector]));
      active.marks[dart.sector] += eM;
      return { ...dart, eM };
    }

    active.marks[dart.sector] += dart.multiple;
    return { ...dart, eM: dart.multiple };
  });

  active.points = calculateScore(format, active.marks);

  const scores = state.scores.map((score, idx) => {
    if (idx === state.currentThrow) {
      return active;
    }

    return score;
  });

  const stats = state.stats.map((playerStats, idx) => {
    if (idx === state.currentThrow) {
      return addStats(playerStats, currentTurn);
    }

    return playerStats;
  });

  const currentThrow = (state.currentThrow + 1) % 2;

  return {
    ...state,
    tx: state.tx + 1,
    priorTurns: [...state.priorTurns, currentTurn],
    currentTurn: [],
    currentThrow,
    scores,
    stats,
    winner: checkWinner(format, scores),
    cpuControl: !!state.players[currentThrow].cpu,
  };
};
