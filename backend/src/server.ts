import fastify from "fastify";
import { registerRoutes } from "./routes";
import { registerPlugins } from "./plugins";

const app = fastify();

registerPlugins(app);

registerRoutes(app);

app.listen(
  { port: process.env.PORT ? Number(process.env.PORT) : 3030, host: "0.0.0.0" },
  (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`HTTP Server running at ${address}`);
  },
);
