export default (state, action) => {
  return {
    ...state,
    tx: state.tx + 1,
    currentTurn: {
      ...state.currentTurn,
      score: state.currentTurn.score.split("").slice(0, -1).join(""),
    },
  };
};
