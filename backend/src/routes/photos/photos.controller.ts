import { FastifyReply, FastifyRequest } from "fastify";
import { getAlbumsPhotos, getPhotoById } from "./photos.service";

interface GetAlbumsPhotosRequest {
  Params: {
    id: string | number;
  };
}

export async function getAlbumsPhotosHandler(
  request: FastifyRequest<GetAlbumsPhotosRequest>,
  reply: FastifyReply,
) {
  const albumId = request.params.id;

  try {
    const albumsPhotos = await getAlbumsPhotos(Number(albumId));
    return reply.status(200).send(albumsPhotos);
  } catch (error) {
    return reply.status(500).send({ message: "Failed to fetch photos", error });
  }
}

export async function getPhotosByIdHandler(
  request: FastifyRequest<GetAlbumsPhotosRequest>,
  reply: FastifyReply,
) {
  const photoId = request.params.id;

  try {
    const albumsPhotos = await getPhotoById(Number(photoId));
    return reply.status(200).send(albumsPhotos);
  } catch (error) {
    return reply.status(500).send({ message: "Failed to fetch photo", error });
  }
}
