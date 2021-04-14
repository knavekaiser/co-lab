const express = require("express");
const app = express();
global.mongoose = require("mongoose");
global.Schema = mongoose.Schema;
global.router = require("express").Router();
global.bcrypt = require("bcryptjs");
global.passport = require("passport");
global.LocalStrategy = require("passport-local").Strategy;
global.JwtStrategy = require("passport-jwt").Strategy;
global.ExtractJwt = require("passport-jwt").ExtractJwt;
global.jwt = require("jsonwebtoken");
global.jwt_decode = require("jwt-decode");
const cookieParser = require("cookie-parser");
const socketIO = require("socket.io");
const { v4: uuidV4 } = require("uuid");

const path = require("path");

require("dotenv").config();

const PORT = process.env.PORT || 5001;
const URI = process.env.MONGO_URI;
const {} = require("./models/user.model");

require("./config/passport");
app.use(passport.initialize());

const server = app
  .use(express.json())
  .use(cookieParser())
  .use(express.static(path.join(__dirname, "client/build")))
  .use("/api", require("./routes/general"))
  .use("/api", require("./routes/user"))
  .get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
  )
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("could not connect to db, here's why: " + err));

const users = {};

const socketToRoom = {};

io.on("connection", async (socket) => {
  const sockets = await io.fetchSockets();
  const clients = [
    ...new Set(sockets.map((socket) => socket.handshake.query.username)),
  ];
  io.emit("members_online", JSON.stringify(clients));
  socket.on("join room", (payload) => {
    const { roomID, username } = JSON.parse(payload);
    socket.join(roomID);
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 4) {
        socket.emit("room full");
        return;
      }
      users[roomID].push({ userID: socket.id, username });
    } else {
      users[roomID] = [{ userID: socket.id, username }];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter(
      (client) => client.userID !== socket.id
    );
    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      caller: payload.caller,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.caller.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("disconnect", (data) => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      let userLeft = "";
      room = room.filter((client) => {
        if (client.userID !== socket.id) {
          userLeft = client.username;
        }
        return client.userID !== socket.id;
      });
      users[roomID] = room;
      io.to(roomID).emit("user_left", userLeft);
    }
  });
});

// io.on("connection", async (socket) => {
//   const sockets = await io.fetchSockets();
//   const clients = [
//     ...new Set(sockets.map((socket) => socket.handshake.query.username)),
//   ];
//   io.emit("members_online", JSON.stringify(clients));
//   socket.on("new_call", (data) => {
//     const target = sockets.filter((client) =>
//       data.guests.includes(client.handshake.query.username)
//     );
//     console.log(target.length);
//     socket.join("room1");
//     socket.to("room1").emit("call_request", {
//       host: socket.handshake.query.username,
//     });
//   });
//   socket.on("disconnect", (reason) => {
//     const clientLeft = socket.handshake.query.username;
//     const clientsOnline = clients.filter(
//       (client) => client !== socket.handshake.query.username
//     );
//     socket.broadcast.emit("members_online", JSON.stringify(clientsOnline));
//   });
// });
