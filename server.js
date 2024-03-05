const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  const stopCapture = (data) => {
    socket.emit("stopCaptureCommand", {
      departmentId: data.departmentId,
    });
  };

  socket.on("sendImage", (data) => {
    socket.emit("receiveImage", data);
  });

  socket.on("stopCapture", (data) => {
    stopCapture(data);
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

const port = 4000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
