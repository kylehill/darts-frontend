const newStats = () => ({
  all: { darts: 0, points: 0 },
  f9: { darts: 0, points: 0 },
  turns: {},
  checkouts: [],
  doubleIn: { misses: 0, hits: 0 },
  doubleOut: { misses: 0, hits: 0 },
});

export default (state, action) => {
  return {
    ...state,
    tx: state.tx + 1,
    legs: state.players.map((_) => 0),
    scores: state.players.map((_) => Number(state.variants.target)),
    stats: state.players.map(newStats),
    firstThrow: 0,
    currentThrow: 0,
    priorTurns: [],
    priorLegs: [],
    currentTurn: { score: "", doubleDart: false },
    winner: null,
    cpuControl: !!state.players[0].cpu,
  };
};
