import { FastifyInstance } from "fastify";
import { getAlbumsPhotosHandler } from "../photos/photos.controller";
import {
  createAlbumHandler,
  deleteAlbumHandler,
  getAlbumByIdHandler,
  patchAlbumHandler,
} from "./albums.controller";

export function albumsRoutes(app: FastifyInstance) {
  app.get("/albums/:id", getAlbumByIdHandler);
  app.delete("/albums/:id", deleteAlbumHandler);
  app.patch("/albums/:id", patchAlbumHandler);
  app.post("/albums", createAlbumHandler);
  app.get("/albums/:id/photos", getAlbumsPhotosHandler);
}
