const express = require("express");
const app = express();
const socketIO = require("socket.io");

const path = require("path");

require("dotenv").config();

const PORT = process.env.PORT || 5001;

// app.use(cors());

const server = app
  .use(express.json())
  .use(express.static(path.join(__dirname, "client/build")))
  .get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
  )
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("someone connected");
  socket.on("newMessage", (data) => {
    console.log(data);
    io.emit("newData", data);
  });
});
