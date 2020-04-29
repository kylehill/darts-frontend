import * as actions from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case "update_state": {
      return actions.updateState(state, action);
    }

    case "click_dart": {
      return actions.clickDartButton(state, action);
    }

    case "key_backspace":
    case "click_back": {
      if (state.currentTurn.length > 0) {
        return actions.eraseDart(state, action);
      }

      return actions.undoTurn(state, action);
    }

    case "key_enter":
    case "click_next": {
      if (state.winner !== null) {
        return actions.nextLeg(state, action);
      }

      return actions.finishTurn(state, action);
    }

    case "change_name": {
      return actions.changeName(state, action);
    }

    case "click_change_first_throw": {
      return actions.changeFirstThrow(state, action);
    }

    case "click_restart_leg": {
      return actions.restartLeg(state, action);
    }

    case "click_restart_match": {
      return actions.restartMatch(state, action);
    }

    default: {
      return state;
    }
  }
};

export default reducer;
