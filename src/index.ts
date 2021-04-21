import express from "express";
import routes from "./routes";

function bootstrap() {
  const server = express();
  const port = 4000;

  server.use(express.json());

  server.use("/", routes);

  server.listen(port, () => {
    console.log(`Application running on http://localhost:${port}`);
  });
}

bootstrap();
