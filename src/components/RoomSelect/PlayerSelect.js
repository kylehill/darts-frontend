import React from "react";

import "./PlayerSelect.scss";

const getColor = (position) => {
  switch (position) {
    case 0:
      return "red";
    case 1:
      return "blue";
    case 2:
      return "green";
    case 3:
      return "orange";
    case 4:
      return "purple";
    case 5:
    default:
      return "pink";
  }
};

const getCpuText = (player) => {
  switch (player.cpu) {
    case "easy":
      return "💻";

    case "medium":
      return "🤖";

    case "hard":
      return "👾";

    case false:
    default:
      return "👤";
  }
};

const getCpuNextVaue = (player) => {
  switch (player.cpu) {
    case "easy":
      return "medium";

    case "medium":
      return "hard";

    case "hard":
      return false;

    case false:
    default:
      return "easy";
  }
};

const getCpuName = (cpuValue, position) => {
  switch (cpuValue) {
    case "easy":
      return "CPU Easy";

    case "medium":
      return "CPU Medium";

    case "hard":
      return "CPU Hard";

    case false:
    default:
      return `Player ${position + 1}`;
  }
};

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
      <button
        className="setup-player-cpu"
        onClick={() => {
          const nextVal = getCpuNextVaue(player);
          updatePlayer(position, { ...player, cpu: nextVal, name: getCpuName(nextVal, position) });
        }}
      >
        {getCpuText(player)}
      </button>
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
            color={getColor(idx)}
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
