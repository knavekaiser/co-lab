import { createContext, useContext, useState } from "react";
import { SiteContext } from "./SiteContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { user } = useContext(SiteContext);
  const onlineSocket = user
    ? io("/", {
        query: {
          username: user.username,
        },
      })
    : null;
  return (
    <SocketContext.Provider value={{ onlineSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
