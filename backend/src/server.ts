import fastify from "fastify";
import { registerPlugins } from "./plugins";
import { registerRoutes } from "./routes";

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
