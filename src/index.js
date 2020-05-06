import React from "react";
import ReactDOM from "react-dom";
import SocketProvider from "./components/SocketProvider";
import "./index.scss";

const fragment = window.location.pathname;
const roomCode = fragment.split("/")[2];
const hash = window.location.hash.split("#")[1];
let hashObject = null;
if (hash) {
  hashObject = hash.split("&").reduce((mem, kvPair) => {
    if (!kvPair.includes("=")) {
      if (kvPair !== "") {
        mem[kvPair] = true;
      }
      return mem;
    }

    const [key, value] = kvPair.split("=");
    mem[key] = value;
    return mem;
  }, {});
}

ReactDOM.render(
  <SocketProvider hashObject={hashObject} urlFragment={roomCode && roomCode.toUpperCase()} />,
  document.getElementById("root")
);
