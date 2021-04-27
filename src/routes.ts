import UsersController from "./app/users/users.controller";

interface Route {
  method: "post" | "get" | "put" | "delete";
  execFunction: string;
  endpoint: string;
}

interface RouteConfig {
  controller: any;
  routes: Route[];
}

const routes: RouteConfig[] = [
  {
    controller: UsersController,
    routes: [
      {
        method: "post",
        execFunction: "store",
        endpoint: "/users",
      },
    ],
  },
];

export default routes;
