import React, { useEffect, useRef, useState, useContext } from "react";
import { SiteContext } from "../context/SiteContext";
import io from "socket.io-client";
import Peer from "simple-peer";

const Audio = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.peer?.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <div>
      {peer.username}
      <audio autoPlay ref={ref} />
    </div>
  );
};

const Room = (props) => {
  const { user } = useContext(SiteContext);
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userAudio = useRef();
  const peersRef = useRef([]);
  const roomID = props.match.params.roomID;
  useEffect(() => {
    socketRef.current = io.connect("/");
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        userAudio.current.srcObject = stream;
        socketRef.current.emit(
          "join room",
          JSON.stringify({ roomID, username: user.username })
        );
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach(({ userID, username }) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push({ peer, username });
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const { callerID, username } = payload.caller;
          const peer = addPeer(payload.signal, callerID, stream);
          peersRef.current.push({
            peerID: callerID,
            peer,
          });

          setPeers((users) => [...users, { peer, username }]);
        });

        socketRef.current.on("user_left", (data) => {
          setPeers((prev) => {
            const newPeers = prev.filter((client) => client.username === data);
            return newPeers;
          });
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        caller: { callerID, username: user.username },
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", {
        signal,
        caller: { callerID },
      });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <div>
      <div>
        self
        <audio muted ref={userAudio} autoPlay />
      </div>
      {peers.map((peer, index) => {
        return <Audio key={index} peer={peer} />;
      })}
    </div>
  );
};

export default Room;
