import { FastifyInstance } from "fastify";
import { corsPlugin } from "./cors";

export function registerPlugins(app: FastifyInstance) {
  corsPlugin(app);
}
