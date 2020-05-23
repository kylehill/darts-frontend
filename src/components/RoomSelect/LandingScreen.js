import React from "react";

import "./LandingScreen.scss";

const joinRoomErrorText = ({ shortCode, publicKey }) => {
  if (shortCode && !publicKey) {
    return "This room code doesn't exist. (Codes expire after 24 hours.)";
  }

  return null;
};

const LandingScreen = ({ checkRoom, roomStatus, joinRoom, selectGame }) => {
  const [roomCode, setRoomCode] = React.useState("");

  return (
    <div className="landing-container">
      <div className="landing-text">
        <p>
          Hey, this is <strong>DistanceDarts</strong>. <br /> It’s a tiny website that helps people
          keep score when they’re playing webcam darts against each other.
        </p>
        <p>
          Everything works off short room codes, kind of like Jackbox games - you can create a game
          and send the code to your friends, and everyone can track the scores and statistics.
        </p>
        <p>
          When you record someone’s throw, it updates for everyone else in real time. We’ve used it
          to play a few tournaments and it’s worked pretty well so far.
        </p>
        <p>
          A few other sites do the same sort of thing, but I tried to streamline the UI and make
          this easy and fun to use, and ensure it works with whatever kind of setup you’ve got.
          Also, it’s extremely free, forever.
        </p>
        <p>
          Bugs or feature requests? Hit me up on twitter, I’m{" "}
          <a href="https://twitter.com/kylehill" rel="noopener noreferrer" target="_blank">
            @kylehill
          </a>
          .
        </p>
      </div>
      <div className="landing-join">
        Join a room:
        <div className="landing-join-controls">
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
            disabled={!roomStatus.publicKey}
            onClick={() => {
              if (!roomStatus.publicKey) {
                return;
              }

              joinRoom();
            }}
          >
            Join Room
          </button>
          {joinRoomErrorText(roomStatus) && (
            <div className="error-text">{joinRoomErrorText(roomStatus)}</div>
          )}
        </div>
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
