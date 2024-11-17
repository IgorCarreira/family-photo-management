import { FastifyInstance } from "fastify";
import { getUserAlbumsHandler } from "../albums/albums.controller";
import { getUsersHandler } from "./users.controller";

export function userRoutes(app: FastifyInstance) {
  app.get("/users", getUsersHandler);
  app.get("/users/:id/albums", getUserAlbumsHandler);
}
