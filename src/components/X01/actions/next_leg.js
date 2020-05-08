export default (state, action) => {
  const legs = state.legs.map((legsWon, idx) => {
    if (idx === state.winner) {
      return legsWon + 1;
    }

    return legsWon;
  });

  const firstThrow = (state.firstThrow + 1) % state.players.length;

  const legSummary = {
    winner: state.winner,
    break: state.winner !== state.firstThrow,
    score: [...state.scores],
    turns: state.priorTurns.reduce(
      (mem, turn) => {
        mem[turn.throw] = mem[turn.throw].concat(turn.score);
        return mem;
      },
      state.players.map((_) => [])
    ),
  };

  const priorLegs = state.priorLegs.concat(legSummary);

  return {
    ...state,
    tx: state.tx + 1,
    legs,
    firstThrow,
    priorLegs,
    priorTurns: [],
    currentThrow: firstThrow,
    currentTurn: { score: "", doubleDart: false },
    scores: state.players.map((_) => Number(state.variants.target)),
    winner: null,
  };
};
