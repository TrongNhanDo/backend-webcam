const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  const stopCapture = (data) => {
    io.sockets.emit("stopCaptureCommand", data);
  };

  socket.on("sendImage", (data) => {
    io.sockets.emit("receiveImage", data);
  });

  socket.on("stopCapture", (data) => {
    stopCapture(data);
  });

  socket.on("stopCaptureDone", (data) => {
    io.sockets.emit("disabledCapture", data);
  });

  socket.on("sendDepartmentList", (data) => {
    io.sockets.emit("receiveDepartmentList", data);
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

const port = 4000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
