import UserPayloadInterface from "../interfaces/user-payload.interface";
import jwt from "jsonwebtoken";

export default class Jwt {
  public static generateToken(payload: UserPayloadInterface): string {
    if (!process.env.JWT_SECRET) {
      throw new Error("A JWT_SECRET was not defined");
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }

  public static verifyToken(token: string): UserPayloadInterface {
    if (!process.env.JWT_SECRET) {
      throw new Error("A JWT_SECRET was not defined");
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload as UserPayloadInterface;
  }
}
