import React from "react";
import LandingScreen from "./LandingScreen";
import GameSetup from "./GameSetup";

const RoomSelect = ({ checkRoom, roomStatus, joinRoom, createRoom }) => {
  const [game, setGame] = React.useState(null);
  const clearGame = () => setGame(null);

  if (!game) {
    return <LandingScreen joinRoom={joinRoom} checkRoom={checkRoom} roomStatus={roomStatus} selectGame={setGame} />;
  }

  return (
    <GameSetup
      game={game}
      clearGame={clearGame}
      checkRoom={checkRoom}
      roomStatus={roomStatus}
      createRoom={createRoom}
    />
  );
};

export default RoomSelect;
