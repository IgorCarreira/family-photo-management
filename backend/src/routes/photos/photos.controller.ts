import { FastifyReply, FastifyRequest } from "fastify";
import {
  createPhoto,
  deletePhoto,
  getAlbumsPhotos,
  getPhotoById,
  patchPhoto,
} from "./photos.service";
import { Photo } from "../../types/photos.types";

interface PhotosRequest {
  Params: {
    id: string | number;
  };
  Body: Partial<Photo>;
}

export async function getAlbumsPhotosHandler(
  request: FastifyRequest<PhotosRequest>,
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
  request: FastifyRequest<PhotosRequest>,
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

export async function createPhotoHandler(
  request: FastifyRequest<PhotosRequest>,
  reply: FastifyReply,
) {
  const body = request.body as Photo;

  try {
    const photo = await createPhoto(body);
    return reply.status(201).send(photo);
  } catch (error) {
    return reply.status(500).send({ message: "Failed to create photo", error });
  }
}

export async function deletePhotoHandler(
  request: FastifyRequest<PhotosRequest>,
  reply: FastifyReply,
) {
  const photoId = request.params.id;

  try {
    const photo = await deletePhoto(Number(photoId));
    return reply.status(200).send(photo);
  } catch (error) {
    return reply.status(500).send({ message: "Failed to create photo", error });
  }
}

export async function patchPhotoHandler(
  request: FastifyRequest<PhotosRequest>,
  reply: FastifyReply,
) {
  const photoId = request.params.id;
  const body = request.body;

  try {
    const photo = await patchPhoto(Number(photoId), body);
    return reply.status(200).send(photo);
  } catch (error) {
    return reply.status(500).send({ message: "Failed to patch photo", error });
  }
}
