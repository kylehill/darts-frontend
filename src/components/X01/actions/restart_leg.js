import { removeTurnFromStats } from "./common";

export default (state, action) => {
  const stats = state.priorTurns.reduce((mem, turn) => {
    return removeTurnFromStats(mem, turn);
  }, state.stats);

  return {
    ...state,
    tx: state.tx + 1,
    stats,
    scores: state.players.map((_) => Number(state.variants.target)),
    currentThrow: state.firstThrow,
    currentTurn: { score: "", doubleDart: false },
    priorTurns: [],
    winner: null,
    cpuControl: !!state.players[state.firstThrow].cpu,
  };
};
