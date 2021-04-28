import UsersController from "../app/users/users.controller";
import RouteConfig from "../interfaces/route-config.interface";

export const usersRoutes: RouteConfig = {
  controller: UsersController,
  routes: [
    {
      method: "post",
      execFunction: "store",
      endpoint: "/users",
    },
  ],
};
