import React from "react";
import CricketConfig, { initializeCricket } from "./CricketConfig";
import PlayerSelect from "./PlayerSelect";
import CreateRoom from "./CreateRoom";

import { updateObject } from "lib";

import "./GameSetup.scss";

const gameConfig = (game, variants, setVariant) => {
  switch (game) {
    case "cricket":
      return <CricketConfig variants={variants} setVariant={setVariant} />;

    default:
      return null;
  }
};

const initializeState = (game, setupState) => {
  switch (game) {
    case "cricket":
      return initializeCricket(setupState);

    default:
      return null;
  }
};

const reducerFn = (state, action) => {
  switch (action.type) {
    case "set_variant":
      const variants = updateObject(state.variants, action.key, action.value);
      return { ...state, variants };

    case "set_players":
      return { ...state, players: action.players };

    default:
      return state;
  }
};

const GameSetup = ({ game, checkRoom, roomStatus, clearGame, createRoom }) => {
  const [setupState, dispatch] = React.useReducer(reducerFn, {
    variants: {},
    players: [
      { cpu: false, name: "Player 1" },
      { cpu: false, name: "Player 2" },
    ],
  });

  const setVariant = (key, value) => {
    dispatch({ type: "set_variant", key, value });
  };

  const setPlayers = (players) => {
    dispatch({ type: "set_players", players });
  };

  const clickCreateGame = () => {
    const state = initializeState(game, setupState);
    createRoom(roomStatus.checking, state);
  };

  const maxPlayers = game === "cricket" ? 2 : 6;

  return (
    <div className={`setup-container setup-container-${game}`}>
      <div className="setup-config">{gameConfig(game, setupState.variants, setVariant)}</div>
      <PlayerSelect players={setupState.players} setPlayers={setPlayers} minPlayers={2} maxPlayers={maxPlayers} />
      <CreateRoom checkRoom={checkRoom} roomStatus={roomStatus} />
      <button disabled={roomStatus.status !== "available"} className="setup-create" onClick={clickCreateGame}>
        Start Game
      </button>
    </div>
  );
};

export default GameSetup;
