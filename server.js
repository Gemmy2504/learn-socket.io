const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const http = require("http").Server(app);
const io = require("socket.io")(http);

let onlineUsers = [];
let room = "main";
io.on("connection", (socket) => {
  const { id, username, online } = socket.handshake.query;
  let index = onlineUsers.find((element) => element.id === id);
  if (index) {
    index.online = true;
  } else {
    onlineUsers.push({ id, username, online });
  }
  console.log(onlineUsers);
  socket.join(room);
  console.log(`a user connected with id ${id}`);

  socket.on("message", (message) => {
    console.log(`Message to room ${room}: ${message}`);
    io.to(room).emit("message", message);
  });

  socket.on("joinRoom", () => {
    socket.join(room);
    console.log(`${socket.handshake.query.id} joined room: ${room}`);
    socket
      .to(room)
      .emit("message", `${socket.handshake.query.id} has joined the room`);
  });

  socket.on("disconnect", () => {
    let index = onlineUsers.find((element) => element.id === id);
    if (index) {
      index.online = false;
    }
    console.log(onlineUsers);
    console.log(`a user disconnected with id ${id}`);
    socket.leave(room);
  });
});

app.use(express.static(__dirname));

const server = http.listen(3000, () => {
  const { port } = server.address();
  console.log(`http Listening on port ${port}`);
});
