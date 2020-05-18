export default (state, action) => {
  if (isNaN(action.score) || Number(action.score) > 180 || action.score.includes("-")) {
    return state;
  }

  return {
    ...state,
    tx: state.tx + 1,
    currentTurn: {
      ...state.currentTurn,
      score: Number(action.score),
    },
  };
};
