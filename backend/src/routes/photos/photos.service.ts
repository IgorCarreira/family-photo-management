import { GetAlbumPhotosResponse } from "../../types/album.types";
import { Photo } from "../../types/photos.types";
import { getAlbumById } from "../albums/albums.service";

export async function getAlbumsPhotos(
  albumId: number,
): Promise<GetAlbumPhotosResponse> {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");

  if (!response.ok) {
    throw new Error("Failed to fetch photos");
  }

  const photos = (await response.json()) as Photo[];

  const album = await getAlbumById(albumId);

  return { album, photos: photos.slice(0, 10) };
}

export async function getPhotoById(photoId: number): Promise<Photo> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos/${photoId}`,
  );
  const photo = (await response.json()) as Photo;
  return photo;
}

export async function createPhoto(body: Omit<Photo, "id">): Promise<Photo> {
  const photoResponse = await fetch(
    `https://jsonplaceholder.typicode.com/photos`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const photo = (await photoResponse.json()) as Photo;

  return photo;
}

export async function deletePhoto(photoId: number): Promise<Photo> {
  const photoResponse = await fetch(
    `https://jsonplaceholder.typicode.com/photos/${photoId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const photo = (await photoResponse.json()) as Photo;

  return photo;
}

export async function patchPhoto(
  photoId: number,
  body?: Partial<Photo>,
): Promise<Photo> {
  const photoResponse = await fetch(
    `https://jsonplaceholder.typicode.com/photos/${photoId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const photo = (await photoResponse.json()) as Photo;

  return photo;
}
