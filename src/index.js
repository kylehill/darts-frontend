import React from "react";
import ReactDOM from "react-dom";
import SocketProvider from "./components/SocketProvider";
import "./index.scss";

const fragment = window.location.pathname;
const roomCode = fragment.split("/")[2];

ReactDOM.render(<SocketProvider urlFragment={roomCode} />, document.getElementById("root"));
