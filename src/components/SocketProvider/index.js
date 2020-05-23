import React from "react";
import io from "socket.io-client";
import { reducer, initReducer } from "./reducer";

import App from "../App";

const SocketProvider = ({ hashObject, urlFragment }) => {
  const [appState, dispatch] = React.useReducer(reducer, initReducer({ urlFragment }));
  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    const socket = io();
    socket.on("update", (data) => {
      dispatch({ type: "update_state", data });
    });

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  React.useEffect(() => {
    if (socket && appState.shortCode) {
      window.history.replaceState(null, null, `/room/${appState.shortCode}`);
    }
  }, [socket, appState.shortCode]);

  React.useEffect(() => {
    if (socket) {
      if (appState.loading) {
        socket.emit("join_short", appState.loading, (response) => {
          dispatch({ type: "join_room_response", response });
        });
      }
    }
  }, [socket, appState.loading, appState.shortCode]);

  const sendState = (state) => {
    socket.emit("update_channel", {
      state,
      publicKey: appState.publicKey,
      privateKey: appState.privateKey,
    });
  };

  const checkRoom = (shortCode) => {
    socket.emit("validate_short", shortCode, (response) => {
      dispatch({
        type: "check_room_response",
        shortCode,
        publicKey: response.shortCode,
      });
    });
  };

  const joinRoom = () => {
    if (appState.shortCode) {
      socket.emit("leave_short", appState.shortCode);
    }
    socket.emit("join_short", appState.roomStatus.shortCode, (response) => {
      dispatch({ type: "join_room_response", response });
    });
  };

  const createRoom = (initialState) => {
    socket.emit(
      "create_channel",
      {
        shortCode: appState.roomStatus.shortCode,
        state: initialState,
        incremental: true,
      },
      (response) => {
        dispatch({ type: "create_room_response", response });
      }
    );
  };

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
