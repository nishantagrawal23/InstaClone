import { io, Socket } from "socket.io-client";

let socket: Socket;

export const connectSocket = () => {
  socket = io("http://localhost:3000", {
    autoConnect: true,
    extraHeaders: {
      auth: localStorage.getItem("accessToken") ?? "",
    },
  });

  return socket;
};

export { socket };