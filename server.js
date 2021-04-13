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

// io.on("connection", (socket) => {
//   console.log("someone connected");
//   socket.on("newMessage", (data) => {
//     console.log(data);
//     io.emit("newData", data);
//   });
// });
//
// io.on("disconnect", (socket) => {
//   console.log("someone left");
// });
