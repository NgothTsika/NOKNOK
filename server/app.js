import "dotenv/config";
import Fastify from "fastify";
import { connectDB } from "./src/configs/connect.js";
import { PORT } from "./src/configs/config.js";
import { admin, buildAdminRouter } from "./src/configs/setup.js";
import { registerRoutes } from "./src/routes/index.js";
import fastifySocketIO from "fastify-socket.io";

const start = async () => {
  await connectDB(process.env.MONGO_URI);

  const app = Fastify();

  app.register(fastifySocketIO, {
    cors: {
      origin: "*",
    },
    pingInterval: 10000,
    pingTimeout: 5000,
    transports: ["websocket"],
  });

  await registerRoutes(app);

  await buildAdminRouter(app);

  app.listen({ port: PORT }, (err, addr) => {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      console.log(
        `TokTok-Shop Started on http://localhost:${PORT}${admin.options.rootPath} `
      );
    }
  });

  app.ready().then(() => {
    app.io.on("connection", (socket) => {
      console.log("A User Connected");

      socket.on("joinRoom", (orderId) => {
        socket.join(orderId);
        console.log(`User Joined room ${orderId}`);
      });

      socket.on("disconnect", () => {
        console.log("User Disconnected");
      });
    });
  });
};

start();
