import * as actions from "./actions";

export default (state, action) => {
  switch (action.type) {
    case "update_state":
      return action.state;

    case "change_score":
      return actions.changeScore(state, action);

    case "click_double":
      return {
        ...state,
        tx: state.tx + 1,
        currentTurn: {
          ...state.currentTurn,
          doubleDart: action.double,
        },
      };

    case "click_next":
      if (state.winner === null) {
        return actions.nextTurn(state, action);
      }
      return actions.nextLeg(state, action);

    case "click_back":
      return actions.undoTurn(state, action);

    case "key_enter":
      return actions.keyEnter(state, action);

    default:
      return state;
  }
};
