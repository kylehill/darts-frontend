export default (state, action) => ({
  ...state,
  tx: state.tx + 1,
  currentTurn: state.currentTurn.concat(action.dart),
});
