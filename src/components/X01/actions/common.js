export const addTurnToStats = (stats, turn) => {
  return stats.map((playerStats, idx) => {
    if (idx !== turn.throw) {
      return playerStats;
    }

    const { darts, doubling, missedDoubles, score, round, checkout } = turn;

    return {
      all: {
        darts: playerStats.all.darts + darts,
        points: playerStats.all.points + score,
      },
      f9: {
        darts: playerStats.f9.darts + (round < 3 ? darts : 0),
        points: playerStats.f9.points + (round < 3 ? score : 0),
      },
      turns: {
        ...playerStats.turns,
        [score]: (playerStats.turns[score] || 0) + 1,
      },
      checkouts: checkout ? [...playerStats.checkouts, score] : [...playerStats.checkouts],
      doubleIn: {
        misses: playerStats.doubleIn.misses + (doubling === "in" ? missedDoubles : 0),
        hits: playerStats.doubleIn.hits + (doubling === "in" && score > 0 ? 1 : 0),
      },
      doubleOut: {
        misses: playerStats.doubleOut.misses + (doubling === "out" ? missedDoubles : 0),
        hits: playerStats.doubleOut.hits + (doubling === "out" && checkout ? 1 : 0),
      },
    };
  });
};

export const removeTurnFromStats = (stats, turn) => {
  return stats.map((playerStats, idx) => {
    if (idx !== turn.throw) {
      return playerStats;
    }

    const { darts, doubling, missedDoubles, score, round, checkout } = turn;

    return {
      all: {
        darts: playerStats.all.darts - darts,
        points: playerStats.all.points - score,
      },
      f9: {
        darts: playerStats.f9.darts - (round < 3 ? darts : 0),
        points: playerStats.f9.points - (round < 3 ? score : 0),
      },
      turns: {
        ...playerStats.turns,
        [score]: (playerStats.turns[score] || 0) - 1,
      },
      checkouts: checkout ? [...playerStats.checkouts.slice(0, -1)] : [...playerStats.checkouts],
      doubleIn: {
        misses: playerStats.doubleIn.misses - (doubling === "in" ? missedDoubles : 0),
        hits: playerStats.doubleIn.hits - (doubling === "in" && score > 0 ? 1 : 0),
      },
      doubleOut: {
        misses: playerStats.doubleOut.misses - (doubling === "out" ? missedDoubles : 0),
        hits: playerStats.doubleOut.hits - (doubling === "out" && checkout ? 1 : 0),
      },
    };
  });
};
