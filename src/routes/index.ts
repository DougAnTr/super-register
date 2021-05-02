import RouteConfig from "../interfaces/route-config.interface";
import { usersRoutes } from "./users.routes";
import { authRoutes } from "./auth.routes";

export const publicRoutes = ["login", "users.post"];

const routes: RouteConfig[] = [usersRoutes, authRoutes];

export default routes;
