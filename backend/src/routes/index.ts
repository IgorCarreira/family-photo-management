import { FastifyInstance } from "fastify";
import { albumsRoutes } from "./albums/albums.routes";
import { photoRoutes } from "./photos/photos.routes";
import { userRoutes } from "./users/users.routes";

export function registerRoutes(app: FastifyInstance) {
  userRoutes(app);
  albumsRoutes(app);
  photoRoutes(app);
}
