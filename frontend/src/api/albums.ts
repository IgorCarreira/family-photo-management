import { Album, AlbumResponse } from "@/types/albums";
import { apiUrl } from "./url";

export const fetchAlbums =
  (userId: number) => async (): Promise<AlbumResponse> => {
    const response = await fetch(`${apiUrl}/users/${userId}/albums`);

    if (!response.ok) {
      throw new Error("Failed to fetch albums");
    }

    return response.json();
  };

export const deleteAlbum = async (albumId: number): Promise<Album> => {
  const response = await fetch(`${apiUrl}/albums/${albumId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete album");
  }

  return response.json();
};

export const patchAlbum = async (album: Album): Promise<Album> => {
  const response = await fetch(`${apiUrl}/albums/${album.id}`, {
    method: "PATCH",
    body: JSON.stringify(album),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to patch album");
  }

  return response.json();
};

export const createAlbum = async (album: Album): Promise<Album> => {
  const response = await fetch(`${apiUrl}/albums`, {
    method: "POST",
    body: JSON.stringify(album),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to create album");
  }

  return response.json();
};
