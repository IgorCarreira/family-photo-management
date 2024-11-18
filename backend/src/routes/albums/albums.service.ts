import {
  Album,
  AlbumGetResponse,
  AlbumListResponse,
} from "../../types/album.types";
import { getUserById } from "../users/users.service";

export async function getUserAlbums(
  userId: number,
): Promise<AlbumListResponse> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/albums`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch albums");
  }

  const albums = (await response.json()) as Album[];

  const user = await getUserById(userId);

  const mappedAlbums = albums.map((album) => ({
    id: album.id,
    title: album.title,
  }));

  return { user, albums: mappedAlbums };
}

export async function getAlbumById(albumId: number): Promise<AlbumGetResponse> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch albums");
  }

  const photosResponse = await fetch(
    "https://jsonplaceholder.typicode.com/photos",
  );

  if (!photosResponse.ok) {
    throw new Error("Failed to fetch photos");
  }

  const album = (await response.json()) as Album;

  const user = await getUserById(album.userId);

  return {
    id: album.id,
    title: album.title,
    user: { username: user.username, id: user.id },
  };
}

export async function createAlbum(body?: Partial<Album>): Promise<Album> {
  const albumResponse = await fetch(
    "https://jsonplaceholder.typicode.com/albums",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const album = (await albumResponse.json()) as Album;

  return album;
}

export async function deleteAlbum(albumId: number): Promise<Album> {
  const albumResponse = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const album = (await albumResponse.json()) as Album;

  return album;
}

export async function patchAlbum(
  albumId: number,
  body?: Partial<Album>,
): Promise<Album> {
  const albumResponse = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const album = (await albumResponse.json()) as Album;

  return album;
}
