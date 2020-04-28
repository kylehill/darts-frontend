const newScores = () => {
  return [
    { points: 0, marks: [0, 0, 0, 0, 0, 0, 0] },
    { points: 0, marks: [0, 0, 0, 0, 0, 0, 0] },
  ];
};

export default (state, action) => {
  const legs = state.legs.map((legsWon, idx) => {
    if (idx === state.winner) {
      return legsWon + 1;
    }

    return legsWon;
  });

  const firstThrow = (state.firstThrow + 1) % 2;

  const legSummary = {
    winner: state.winner,
    break: state.winner !== state.firstThrow,
    score: state.scores.map((x) => x.points),
  };

  const priorLegs = state.priorLegs.concat(legSummary);

  return {
    ...state,
    tx: state.tx + 1,
    legs,
    priorLegs,
    priorTurns: [],
    firstThrow,
    currentThrow: firstThrow,
    currentTurn: [],
    scores: newScores(),
    winner: null,
  };
};
