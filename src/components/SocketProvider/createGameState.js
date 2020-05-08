import createCricketState from "lib/createCricketState";

const createCricket = (urlFragment, names, title) => {
  return createCricketState({
    title: title ? decodeURI(title) : "",
    roomCode: urlFragment,
    variants: {},
    players: names.split(",").map((name, idx) => {
      return {
        name: name ? decodeURI(name) : `Player ${idx + 1}`,
        cpu: false,
      };
    }),
  });
};

const createGameState = (urlFragment, hashObject) => {
  const { game, names, title } = hashObject;

  switch (game) {
    case "cricket":
      return createCricket(urlFragment, names, title);

    default:
      return false;
  }
};

export default createGameState;
