const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const uuid = require("uuid");
const cors = require("cors");

const path = require("path");

require("dotenv").config();

const PORT = process.env.PORT || 3001;
const URI = process.env.ATLAS_URI;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/build/index.html"))
);

io.on("connection", (socket) => {
  socket.on("test", (data) => {
    io.emit("newData", data);
  });
});

io.listen(PORT + 1, () => console.log("socket is open at ", PORT + 1));
app.listen(PORT, () => console.log("server just ran at " + PORT));
