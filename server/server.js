import express from "express";
import colors from "colors";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
import { readFileSync, writeFileSync } from "fs";

// Init Express.
const app = express();
const __dirname = path.resolve();

// Create httpServer.
const httpServer = createServer(app);

// Init socket.io.
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  const oldData = JSON.parse(
    readFileSync(path.join(__dirname, "/db/db.json")).toString()
  );

  io.sockets.emit("chat", oldData);

  socket.on("chat", (data) => {
    const oldData = JSON.parse(
      readFileSync(path.join(__dirname, "/db/db.json")).toString()
    );

    oldData.push(data);
    writeFileSync(path.join(__dirname, "/db/db.json"), JSON.stringify(oldData));

    io.sockets.emit("chat", oldData);
  });
});

// Listen Server.
httpServer.listen(5050, () => {
  console.log(` Server is running on port 5050`.bgMagenta.black);
});
