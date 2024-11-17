import { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export async function swaggerPlugin(fastify: FastifyInstance) {
  await fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Family photo management's API",
        description: "API's documentation",
        version: "1.0.0",
      },
    },
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: "/documentation",
  });
}
