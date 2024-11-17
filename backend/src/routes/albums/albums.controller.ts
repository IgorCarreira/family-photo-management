import { FastifyReply, FastifyRequest } from "fastify";
import { getAlbumById, getUserAlbums } from "./albums.service";

interface GetUserAlbumsRequest {
  Params: {
    id: string | number;
  };
}

export async function getUserAlbumsHandler(
  request: FastifyRequest<GetUserAlbumsRequest>,
  reply: FastifyReply,
) {
  const userId = request.params.id;

  try {
    const albums = await getUserAlbums(Number(userId));
    return reply.status(200).send(albums);
  } catch (error) {
    return reply.status(500).send({ message: "Failed to fetch albums", error });
  }
}

export async function getAlbumByIdHandler(
  request: FastifyRequest<GetUserAlbumsRequest>,
  reply: FastifyReply,
) {
  const albumId = request.params.id;

  try {
    const albums = await getAlbumById(Number(albumId));
    return reply.status(200).send(albums);
  } catch (error) {
    return reply.status(500).send({ message: "Failed to fetch album", error });
  }
}
