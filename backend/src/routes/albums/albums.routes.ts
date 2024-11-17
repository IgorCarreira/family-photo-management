import { FastifyInstance } from "fastify";
import { getAlbumsPhotosHandler } from "../photos/photos.controller";
import { getAlbumByIdHandler } from "./albums.controller";

export function albumsRoutes(app: FastifyInstance) {
  app.get("/albums/:id", getAlbumByIdHandler);
  app.get("/albums/:id/photos", getAlbumsPhotosHandler);
}
