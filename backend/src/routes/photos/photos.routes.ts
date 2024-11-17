import { FastifyInstance } from "fastify";
import {
  createPhotoHandler,
  deletePhotoHandler,
  getPhotosByIdHandler,
  patchPhotoHandler,
} from "./photos.controller";

export function photoRoutes(app: FastifyInstance) {
  app.get("/photos/:id", getPhotosByIdHandler);
  app.patch("/photos/:id", patchPhotoHandler);
  app.delete("/photos/:id", deletePhotoHandler);
  app.post("/photos", createPhotoHandler);
}
