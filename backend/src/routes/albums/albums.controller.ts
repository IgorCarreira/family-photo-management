import { FastifyReply, FastifyRequest } from "fastify";
import {
  createAlbum,
  deleteAlbum,
  getAlbumById,
  getUserAlbums,
  patchAlbum,
} from "./albums.service";
import { Album } from "../../types/album.types";

interface AlbumsRequest {
  Params: {
    id: string | number;
  };
  Body?: Partial<Album>;
}

export async function getUserAlbumsHandler(
  request: FastifyRequest<AlbumsRequest>,
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
  request: FastifyRequest<AlbumsRequest>,
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

export async function createAlbumHandler(
  request: FastifyRequest<AlbumsRequest>,
  reply: FastifyReply,
) {
  const body = request.body;

  try {
    const album = await createAlbum(body);
    return reply.status(201).send(album);
  } catch (error) {
    return reply.status(500).send({ message: "Failed to create album", error });
  }
}

export async function deleteAlbumHandler(
  request: FastifyRequest<AlbumsRequest>,
  reply: FastifyReply,
) {
  const albumId = request.params.id;

  try {
    const album = await deleteAlbum(Number(albumId));
    return reply.status(200).send(album);
  } catch (error) {
    return reply.status(500).send({ message: "Failed to create album", error });
  }
}

export async function patchAlbumHandler(
  request: FastifyRequest<AlbumsRequest>,
  reply: FastifyReply,
) {
  const albumId = request.params.id;
  const body = request.body;

  try {
    const album = await patchAlbum(Number(albumId), body);
    return reply.status(200).send(album);
  } catch (error) {
    return reply.status(500).send({ message: "Failed to patch album", error });
  }
}
