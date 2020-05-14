import * as actions from "./actions";

export default (state, action) => {
  switch (action.type) {
    case "update_state":
      return action.state;

    case "change_name": {
      return actions.changeName(state, action);
    }

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

    case "click_change_first_throw":
      return actions.changeFirstThrow(state, action);

    case "click_restart_leg":
      return actions.restartLeg(state, action);

    case "click_restart_match":
      return actions.restartMatch(state, action);

    case "key_number":
      return actions.keyNumber(state, action);

    case "key_enter":
      return actions.keyEnter(state, action);

    case "key_backspace":
      if (state.currentTurn.score === "") {
        return actions.undoTurn(state, action);
      }

      return actions.keyBackspace(state, action);

    default:
      return state;
  }
};
