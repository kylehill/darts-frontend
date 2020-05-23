import React from "react";

import "./CreateRoom.scss";

const createRoomErrorText = ({ shortCode, publicKey }) => {
  if (shortCode && publicKey) {
    return "This room code is in use.";
  }

  return null;
};

const CreateRoom = ({ checkRoom, roomStatus }) => {
  const [roomCode, setRoomCode] = React.useState("");

  return (
    <div className="setup-room">
      <input
        type="text"
        value={roomCode}
        placeholder={"Room code"}
        onChange={(e) => {
          const code = e.target.value.toUpperCase();
          setRoomCode(code);
          checkRoom(code);
        }}
      />
      <button
        onClick={() => {
          const code = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
            .toString(34)
            .toUpperCase()
            .split("")
            .reverse()
            .filter((x) => isNaN(x))
            .slice(0, 4)
            .map((c) => {
              switch (c) {
                case "I":
                  return "Y";
                case "O":
                  return "Z";
                default:
                  return c;
              }
            })
            .join("");

          setRoomCode(code);
          checkRoom(code);
        }}
      >
        Random Code
      </button>
      {createRoomErrorText(roomStatus) && (
        <div className="error-text">{createRoomErrorText(roomStatus)}</div>
      )}
    </div>
  );
};

export default CreateRoom;
