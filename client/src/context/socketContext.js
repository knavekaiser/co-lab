import { createContext } from "react";
import socketio from "socket.io-client";
import io from "socket.io-client";

// export const socket = io("http://localhost:3001");
// export const socket2 = io();
export const SocketContext = createContext();
