import { useContext, useEffect, useState } from "react";
import { SiteContext } from "./context/SiteContext";
import { SocketContext } from "./context/SocketContext";
import Contacts from "./components/Contacts";
import { Link, useHistory, Route } from "react-router-dom";
import Room from "./components/Room";
import { v1 as uuid } from "uuid";

const LandingPage = () => {
  const history = useHistory();
  const { setUser } = useContext(SiteContext);
  const { onlineSocket, callSocket } = useContext(SocketContext);
  useEffect(() => {
    return () => onlineSocket.disconnect();
  }, []);
  useEffect(() => {
    callSocket.on("call_request", (data) => {
      console.log(data, "is calling");
    });
  }, []);
  return (
    <div>
      <h1>Co-lab</h1>
      <Contacts />
      <button
        onClick={() => {
          fetch("/api/logout")
            .then((res) => res.json())
            .then(({ user, success }) => {
              if (success) {
                setUser(user);
                history.push("/login");
              }
            });
        }}
      >
        logout
      </button>
      <button
        onClick={() => {
          history.push(`/room/${uuid()}`);
        }}
      >
        Start room
      </button>
      <Route path="/room/:roomID" component={Room} />
    </div>
  );
};
export default LandingPage;
