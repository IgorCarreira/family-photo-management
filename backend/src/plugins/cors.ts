import { FastifyInstance } from "fastify";
import fastifyCors from "@fastify/cors";

export function corsPlugin(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: true,
  });
}
