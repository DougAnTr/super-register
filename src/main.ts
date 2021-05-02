import express from "express";
import routes from "./routes";
import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import { authMiddleware } from "./middlewares/auth.middleware";

function bootstrap() {
  const server = express();
  const port = process.env.PORT || "4000";

  dotenv.config();

  createConnection().then(() => {
    server.use(express.json());
    server.use(authMiddleware);

    routes.forEach((routeConfig) => {
      const controller = new routeConfig.controller();

      routeConfig.routes.forEach((route) => {
        server[route.method](
          route.endpoint,
          controller[route.execFunction].bind(controller)
        );
      });
    });

    server.listen(port, () => {
      console.log(`Application running on http://localhost:${port}`);
    });
  });
}

bootstrap();
