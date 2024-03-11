import { Server } from "socket.io";

const socketIO = (server) => {
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
};

export default socketIO;
