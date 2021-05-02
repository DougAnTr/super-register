import express, { Response } from "express";
import routes from "./routes";
import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import Jwt from "./adapters/jwt";
import { Request } from "./interfaces/express";

function bootstrap() {
  const server = express();
  const port = process.env.PORT || "4000";

  dotenv.config();

  createConnection().then(() => {
    server.use(express.json());

    server.use((req: Request, res: Response, next) => {
      const allowedRoutes = ["login", "users.post"];

      try {
        if (
          allowedRoutes.findIndex((r) => {
            const [route, method] = r.split(".");

            if (route === req.url.substr(1)) {
              if (method && method !== req.method) {
                return false;
              }

              return true;
            }

            return false;
          }) !== -1
        ) {
          return next();
        }

        if (!req.headers.authorization) {
          return res.status(401).send("Unauthorized");
        }

        const token = req.headers.authorization.split("Bearer ")[1];
        req.user = Jwt.verifyToken(token);
      } catch (error) {
        return res.status(401).send("Invalid token");
      }
    });
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
