import restartLeg from "./restart_leg";

export default (state, action) => {
  const newState = restartLeg(state, action);

  return {
    ...newState,
    firstThrow: action.firstThrow,
    currentThrow: action.firstThrow,
  };
};
