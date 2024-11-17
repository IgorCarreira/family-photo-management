import { GetAlbumPhotosResponse } from "../../types/album.types";
import { Photo } from "../../types/photos.types";
import { User } from "../../types/users.types";
import { getAlbumById } from "../albums/albums.service";

export async function getAlbumsPhotos(
  albumId: number
): Promise<GetAlbumPhotosResponse> {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");

  if (!response.ok) {
    throw new Error("Failed to fetch photos");
  }

  const photos: Photo[] = await response.json();

  const album = await getAlbumById(albumId);

  return { album, photos };
}

export async function getPhotoById(photoId: number): Promise<Photo> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos/${photoId}`
  );
  const photo = (await response.json()) as Photo;
  return photo;
}
