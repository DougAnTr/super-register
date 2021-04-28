import RouteConfig from "../interfaces/route-config.interface";
import { usersRoutes } from "./users.routes";
import { authRoutes } from "./auth.routes";

const routes: RouteConfig[] = [usersRoutes, authRoutes];

export default routes;
