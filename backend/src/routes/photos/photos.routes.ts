import { FastifyInstance } from "fastify";
import { getPhotosByIdHandler } from "./photos.controller";

export function photoRoutes(app: FastifyInstance) {
  app.get("/photos/:id", getPhotosByIdHandler);
}
