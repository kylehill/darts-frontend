import React from "react";

import "./LandingScreen.scss";

const joinRoomErrorText = (status) => {
  switch (status) {
    case "archived":
      return "This room code is expired.";
    case "available":
      return "This room code doesn't exist.";
    default:
      return null;
  }
};

const LandingScreen = ({ checkRoom, roomStatus, joinRoom, selectGame }) => {
  const [roomCode, setRoomCode] = React.useState("");
  const { checking, status } = roomStatus;

  return (
    <div className="landing-container">
      <div className="landing-join">
        <input
          type="text"
          value={roomCode}
          placeholder="Room Code"
          onChange={(e) => {
            const code = e.target.value.toUpperCase();
            setRoomCode(code);
            checkRoom(code);
          }}
        />
        <button
          disabled={status !== "active"}
          onClick={() => {
            if (checking !== roomCode || status !== "active") {
              return;
            }

            joinRoom(roomCode);
          }}
        >
          Join Room
        </button>
        {joinRoomErrorText(status) && <div className="error-text">{joinRoomErrorText(status)}</div>}
      </div>
      <div className="landing-create">
        Create a new game:
        <div className="landing-create-buttons">
          <button className="button-cricket" onClick={() => selectGame("cricket")}>
            Cricket
          </button>
          <button className="button-x01" onClick={() => selectGame("x01")}>
            X01
          </button>
          <button className="button-clocky" disabled={true} onClick={() => selectGame("clocky")}>
            Clocky
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
