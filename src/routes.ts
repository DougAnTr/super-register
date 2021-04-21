import { Router } from "express";
import UsersController from "./app/users/users.controller";

const routes = Router();

routes.post("/users", new UsersController().store);

export default routes;
