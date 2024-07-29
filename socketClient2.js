const { io } = require("socket.io-client");

const id = "a850cc46";
const username = "user2";
const online = true;
const socket = io("ws://localhost:3000", {
  query: { id, username, online },
});
//socket.emit("query",username);
socket.on("global_message", function (msg) {
  console.log(msg);
});

function sendMessage(message) {
  socket.emit("message", message);
}

sendMessage("hello from user2");

socket.on("message", (message) => {
  console.log(message);
});
