import {
  Album,
  AlbumGetResponse,
  AlbumListResponse,
} from "../../types/album.types";
import { Photo } from "../../types/photos.types";
import { getUserById } from "../users/users.service";

export async function getUserAlbums(
  userId: number
): Promise<AlbumListResponse> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/albums`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch albums");
  }

  const albums: Album[] = await response.json();

  const user = await getUserById(userId);

  const mappedAlbums = albums.map((album) => ({
    id: album.id,
    title: album.title,
  }));

  return { user, albums: mappedAlbums };
}

export async function getAlbumById(albumId: number): Promise<AlbumGetResponse> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch albums");
  }

  const photosResponse = await fetch(
    `https://jsonplaceholder.typicode.com/photos`
  );

  if (!photosResponse.ok) {
    throw new Error("Failed to fetch photos");
  }

  const photos: Photo[] = await photosResponse.json();

  const album: Album = await response.json();

  const user = await getUserById(album.userId);

  return {
    id: album.id,
    title: album.title,
    user: { username: user.username },
  };
}
