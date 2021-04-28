interface Route {
  method: "post" | "get" | "put" | "delete";
  execFunction: string;
  endpoint: string;
}

export default interface RouteConfig {
  controller: any;
  routes: Route[];
}
