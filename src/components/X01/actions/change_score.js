export default (state, action) => {
  return {
    ...state,
    tx: state.tx + 1,
    currentTurn: {
      ...state.currentTurn,
      score: action.score,
    },
  };
};