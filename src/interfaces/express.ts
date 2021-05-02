import { Request as ExpressRequest } from "express";
import UserPayloadInterface from "./user-payload.interface";

export interface Request extends ExpressRequest {
  user?: UserPayloadInterface;
}
