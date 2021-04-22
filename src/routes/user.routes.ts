import { Router } from "express";
import UsersController from "../app/users/users.controller";

const UserRoutes = Router();

UserRoutes.post("/", new UsersController().store);

export default UserRoutes;
