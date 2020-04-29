export const calculateScore = (format, marks) => {
  switch (format) {
    case "no-points":
      return 0;

    case "standard":
    default: {
      return [20, 19, 18, 17, 16, 15, 25].reduce((mem, segmentValue, segment) => {
        return mem + Math.max(0, marks[segment] - 3) * segmentValue;
      }, 0);
    }
  }
};

export const newStats = () => {
  return [
    { darts: 0, marks: 0, hits: 0, turns: Array.from(Array(10), (_) => 0), mpr: 0, hitRate: 0 },
    { darts: 0, marks: 0, hits: 0, turns: Array.from(Array(10), (_) => 0), mpr: 0, hitRate: 0 },
  ];
};

export const newScores = () => {
  return [
    { points: 0, marks: [0, 0, 0, 0, 0, 0, 0] },
    { points: 0, marks: [0, 0, 0, 0, 0, 0, 0] },
  ];
};

export const calculateStats = ({ marks, darts, hits, turns }) => {
  const mpr = (marks / (darts || 1)) * 3;
  const hitRate = hits / (darts || 1);

  return {
    darts,
    marks,
    hits,
    turns,
    mpr,
    hitRate,
  };
};

export const undoStats = (playerStats, turn) => {
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

  return calculateStats({ darts, marks, hits, turns });
};
