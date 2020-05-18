export default (state, action) => {
  return {
    ...state,
    tx: state.tx + 1,
    currentTurn: {
      ...state.currentTurn,
      score: Number(state.currentTurn.score + action.digit),
    },
  };
};
