const { io } = require("socket.io-client");

const id = "9d617083";
const username = "user1";
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

sendMessage("hello from user");
socket.on("message", (message) => {
  console.log(message);
});
