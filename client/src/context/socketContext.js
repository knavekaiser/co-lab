import { createContext } from "react";
import io from "socket.io-client";

const socket = io();
export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
