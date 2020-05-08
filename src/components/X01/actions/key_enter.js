import nextLeg from "./next_leg";
import nextTurn from "./next_turn";

export default (state, action) => {
  const { variants, currentTurn } = state;
  const activeScore = state.scores[state.currentThrow];
  const trackDoubles = variants.trackDoubles === "yes";
  const doublingIn =
    trackDoubles &&
    variants.start === "double" &&
    activeScore === Number(variants.target) &&
    currentTurn.score > 0;

  const doublingOut =
    trackDoubles &&
    variants.end === "double" &&
    activeScore === Number(currentTurn.score) &&
    currentTurn.score !== "";

  const missedDoubles =
    trackDoubles &&
    variants.end === "double" &&
    activeScore - Number(currentTurn.score) <= 50 &&
    currentTurn.score !== "";

  const disableNext =
    state.currentTurn.score === "" ||
    ((doublingIn || doublingOut || missedDoubles) && state.currentTurn.doubleDart === false);

  if (disableNext) {
    return state;
  }

  if (state.winner === null) {
    return nextTurn(state, action);
  }
  return nextLeg(state, action);
};
