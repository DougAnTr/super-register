import RouteConfig from "../interfaces/route-config.interface";
import AuthController from "../app/auth/auth.controller";

export const authRoutes: RouteConfig = {
  controller: AuthController,
  routes: [
    {
      method: "post",
      execFunction: "login",
      endpoint: "/login",
    },
  ],
};
