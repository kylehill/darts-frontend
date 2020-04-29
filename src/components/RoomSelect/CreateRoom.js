import React from "react";

import "./CreateRoom.scss";

const createRoomErrorText = (status) => {
  switch (status) {
    case "archived":
    case "active":
      return "This room code is unavailable.";
    default:
      return null;
  }
};

const CreateRoom = ({ checkRoom, roomStatus }) => {
  const [roomCode, setRoomCode] = React.useState("");
  const { status } = roomStatus;

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
              }

              return c;
            })
            .join("");

          setRoomCode(code);
          checkRoom(code);
        }}
      >
        Random Code
      </button>
      {createRoomErrorText(status) && <div className="error-text">{createRoomErrorText(status)}</div>}
    </div>
  );
};

export default CreateRoom;
