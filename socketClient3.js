const { io } = require("socket.io-client");
const { v4: uuidv4 } = require("uuid");

const id = "4de7bcad";
const username = "user3";
const online=true;
const socket = io("ws://localhost:3000", {
  query: { id, username ,online},
});
socket.on("global_message", function (msg) {
  console.log(msg);
});
