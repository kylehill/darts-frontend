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

    default: {
      return state;
    }
  }
};

export default reducer;
