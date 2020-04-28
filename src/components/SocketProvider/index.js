import React from "react";
import io from "socket.io-client";

import App from "../App";

const reducerFn = (state, action) => {
  switch (action.type) {
    case "start_loading":
      return { ...state, loading: true };

    case "update_state":
      if (action.data && state.roomCode === action.data.roomCode) {
        if (action.data.state === null) {
          return { ...state, loading: false };
        }
        return Object.assign({}, state, {
          state: action.data.state,
          loading: false,
        });
      }
      return state;

    case "change_room":
      return Object.assign({}, state, {
        roomCode: action.roomCode || null,
      });

    case "check_room":
      return Object.assign({}, state, {
        roomStatus: Object.assign({}, state.roomStatus, {
          checking: action.roomCode,
          status: null,
        }),
      });

    case "update_room_status":
      if (state.roomStatus.checking !== action.data.roomCode) {
        return state;
      }

      return Object.assign({}, state, {
        roomStatus: Object.assign({}, state.roomStatus, {
          checking: action.data.roomCode,
          status: action.data.status,
        }),
      });

    default:
      return state;
  }
};

const SocketProvider = ({ urlFragment }) => {
  const [appState, dispatch] = React.useReducer(reducerFn, {
    roomCode: null,
    roomStatus: {
      checking: null,
      status: null,
    },
    data: {},
    loading: !!urlFragment,
  });

  const [socket, setSocket] = React.useState(null);

  const _sendMessage = (messageType, data) => {
    if (!socket) {
      return false;
    }

    socket.emit(messageType, data);
    return true;
  };

  const sendState = (state) => {
    _sendMessage("state", {
      state,
      roomCode: appState.roomCode,
    });
  };

  const checkRoom = (roomCode) => {
    dispatch({ type: "check_room", roomCode });
    if (roomCode) {
      _sendMessage("room_status", roomCode);
    }
  };

  const joinRoom = (roomCode) => {
    if (appState.roomCode) {
      _sendMessage("leave", appState.roomCode);
    }
    if (roomCode) {
      _sendMessage("join", roomCode);

      window.history.replaceState(null, null, `/room/${roomCode}`);
    }

    dispatch({ type: "change_room", roomCode });
  };

  const createRoom = (roomCode, initialState) => {
    _sendMessage("state", {
      state: initialState,
      roomCode,
    });

    joinRoom(roomCode);
  };

  React.useEffect(() => {
    const socket = io("https://dartboard-mirror.glitch.me");
    socket.on("state", (data) => {
      dispatch({ type: "update_state", data });
    });

    socket.on("room_status", (data) => {
      dispatch({ type: "update_room_status", data });
    });

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  React.useEffect(() => {
    if (socket && urlFragment) {
      dispatch({ type: "start_loading" });
      joinRoom(urlFragment);
    }
  }, [socket, urlFragment]);

  return (
    <>
      {appState.loading ? null : (
        <App
          sendState={sendState}
          checkRoom={checkRoom}
          joinRoom={joinRoom}
          createRoom={createRoom}
          state={appState.state}
          roomStatus={appState.roomStatus}
        />
      )}
    </>
  );
};

export default SocketProvider;
