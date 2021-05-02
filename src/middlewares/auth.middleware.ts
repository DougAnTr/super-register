import { NextFunction, Response } from "express";
import Jwt from "../adapters/jwt";
import { Request } from "../interfaces/express";
import { publicRoutes } from "../routes";

const verifyPublicRoute = (req: Request) => {
  const routeIndex = publicRoutes.findIndex((r) => {
    const [route, method] = r.split(".");

    if (route !== req.url.substr(1)) {
      return false;
    }

    if (method && method !== req.method.toLowerCase()) {
      return false;
    }

    return true;
  });

  return routeIndex !== -1;
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isPublicRoute = verifyPublicRoute(req);
    console.log(isPublicRoute);
    if (isPublicRoute) {
      return next();
    }

    if (!req.headers.authorization) {
      return res.status(401).send("Unauthorized");
    }

    const token = req.headers.authorization.split("Bearer ")[1];
    req.user = Jwt.verifyToken(token);

    return next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
};
