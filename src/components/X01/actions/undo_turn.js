import { removeTurnFromStats } from "./common";

export default (state, action) => {
  if (state.priorTurns.length === 0) {
    return state;
  }

  const lastTurn = state.priorTurns.slice(-1)[0];

  const scores = state.scores.map((score, idx) => {
    if (idx === lastTurn.throw) {
      return score + lastTurn.score;
    }
    return score;
  });

  const currentTurn = {
    score: lastTurn.score.toString(),
    doubleDart: lastTurn.checkout ? lastTurn.darts : lastTurn.missedDoubles || false,
  };

  const priorTurns = state.priorTurns.slice(0, -1);
  const stats = removeTurnFromStats(state.stats, lastTurn);

  return {
    ...state,
    tx: state.tx + 1,
    scores,
    stats,
    currentThrow: lastTurn.throw,
    currentTurn,
    priorTurns,
    winner: null,
  };
};
