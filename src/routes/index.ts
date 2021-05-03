import RouteConfig from "../interfaces/route-config.interface";
import { usersRoutes } from "./users.routes";
import { authRoutes } from "./auth.routes";
import { verificationCodesRoutes } from "./verification-codes.routes";

export const publicRoutes = [
  "login",
  "users.post",
  "verify-account",
  "send-code",
];

const routes: RouteConfig[] = [
  usersRoutes,
  authRoutes,
  verificationCodesRoutes,
];

export default routes;
