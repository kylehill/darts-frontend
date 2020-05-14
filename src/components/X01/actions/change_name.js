export default (state, action) => {
  return {
    ...state,
    tx: state.tx + 1,
    players: state.players.map((player, idx) => {
      if (idx === action.player) {
        return { ...player, name: action.name };
      }

      return player;
    }),
  };
};
