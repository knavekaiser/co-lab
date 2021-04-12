const express = require("express");
const app = express();
// const server = require("http").Server(app);
const socketIO = require("socket.io");
// (server, {
// cors: {
//   origin: "*",
//   methods: ["GET", "POST"],
// },
// });
// const uuid = require("uuid");
// const cors = require("cors");

const path = require("path");

require("dotenv").config();

const PORT = process.env.PORT || 5001;

// app.use(express.json());
// app.use(cors());

// app.use(express.static(path.join(__dirname, "client/build")));

const server = app
  .use(express.static(path.join(__dirname, "client/build")))
  .get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
  )
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("someone connected");
  socket.on("test", (data) => {
    console.log(data);
    io.emit("newData", data);
  });
});

// io.listen(PORT + 1, () => console.log("socket is open at ", PORT + 1));
// app.listen(PORT, () => console.log("server just ran at " + PORT));
