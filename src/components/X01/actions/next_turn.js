import { addTurnToStats } from "./common";

export default (state, action) => {
  const { variants } = state;
  const activeScore = state.scores[state.currentThrow];

  let turnScore = Number(state.currentTurn.score);
  if (activeScore < turnScore || activeScore - turnScore === 1) {
    turnScore = 0;
  }

  const scores = state.scores.map((score, idx) => {
    if (idx === state.currentThrow) {
      return score - turnScore;
    }
    return score;
  });

  const currentTurn = {
    throw: state.currentThrow,
    round: Math.floor(state.priorTurns.length / state.players.length),
    darts: 3,
    remaining: [...scores],
    score: turnScore,
    doubling: false,
    missedDoubles: 0,
  };

  if (activeScore === turnScore) {
    currentTurn.checkout = true;
  }

  if (variants.trackDoubles === "yes") {
    if (activeScore === Number(variants.target) && variants.start === "double") {
      currentTurn.doubling = "in";
      if (turnScore === 0) {
        currentTurn.missedDoubles = 3;
      } else {
        currentTurn.missedDoubles = (state.currentTurn.doubleDart || 1) - 1;
      }
    }

    if (variants.end === "double") {
      if (activeScore - turnScore <= 50) {
        currentTurn.doubling = "out";
        currentTurn.missedDoubles = state.currentTurn.doubleDart;
      }
    }
  }

  const priorTurns = state.priorTurns.concat(currentTurn);
  const stats = addTurnToStats(state.stats, currentTurn);

  return {
    ...state,
    tx: state.tx + 1,
    scores,
    stats,
    currentThrow: (state.currentThrow + 1) % state.players.length,
    currentTurn: { score: "", doubleDart: false },
    priorTurns,
    winner: activeScore === turnScore ? state.currentThrow : null,
  };
};
