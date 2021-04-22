import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import UserRoutes from "./routes/user.routes";

class App {
  private server: express.Application;
  private port: string | number;

  constructor() {
    this.port = process.env.PORT || 4000;
    this.server = express();
    this.config().then(() => {
      this.routes();
    });
  }

  public init() {
    this.server.listen(this.port, () => {
      console.log(`Application running on http://localhost:${this.port}`);
    });
  }

  private async config() {
    await createConnection();
    this.server.use(express.json);
  }

  private routes() {
    this.server.use("users", UserRoutes);
  }
}

const app = new App();
app.init();
