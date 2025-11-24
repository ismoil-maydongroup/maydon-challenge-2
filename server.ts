import { createServer } from "http";
import next from "next";
import express from "express";
import {
  messageApplicationService,
  llmApplicationService,
  userRepository,
  eventBus,
} from "./src/infrastructure/dependencies";
import { createSocketServer } from "./src/infrastructure/socket/socketServer";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();
  const httpServer = createServer(expressApp);

  // Create Socket.io server
  const io = createSocketServer(
    httpServer,
    messageApplicationService,
    llmApplicationService,
    userRepository,
    eventBus
  );

  // Store io instance for API routes
  expressApp.set("io", io);

  // Handle Next.js requests
  expressApp.all("*", (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
