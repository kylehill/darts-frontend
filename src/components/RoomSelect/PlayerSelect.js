import React from "react";

import "./PlayerSelect.scss";

const Player = ({ color, player, position, minPlayers, updatePlayer, removePlayer }) => {
  return (
    <div className={`setup-player setup-player-${color}`}>
      <input
        className="setup-player-name"
        value={player.name}
        onChange={(e) => {
          updatePlayer(position, { ...player, name: e.target.value });
        }}
      />
      {position >= minPlayers && (
        <button
          className="setup-player-remove"
          onClick={() => {
            removePlayer(position);
          }}
        >
          ╳
        </button>
      )}
    </div>
  );
};

const PlayerSelect = ({ players, setPlayers, doubles, minPlayers, maxPlayers }) => {
  const addPlayer = () => {
    if (doubles) {
      setPlayers(
        players.concat([
          {
            cpu: false,
            name: `Player ${players.length + 1}`,
          },
          {
            cpu: false,
            name: `Player ${players.length + 2}`,
          },
        ])
      );
    } else {
      setPlayers(
        players.concat({
          cpu: false,
          name: `Player ${players.length + 1}`,
        })
      );
    }
  };

  const updatePlayer = (position, player) => {
    setPlayers(
      players.map((p, idx) => {
        if (idx === position) {
          return player;
        }
        return p;
      })
    );
  };

  const removePlayer = (position) => {
    setPlayers(
      players.filter((p, idx) => {
        if (idx === position) {
          return false;
        }
        return true;
      })
    );
  };

  return (
    <div className="setup-players">
      {players.map((p, idx) => {
        return (
          <Player
            color={idx === 0 ? "red" : "blue"}
            key={idx}
            player={p}
            position={idx}
            minPlayers={minPlayers}
            updatePlayer={updatePlayer}
            removePlayer={removePlayer}
          />
        );
      })}
      {players.length < maxPlayers && (
        <button onClick={addPlayer} className="setup-players-create">
          Add Player
        </button>
      )}
    </div>
  );
};

export default PlayerSelect;
