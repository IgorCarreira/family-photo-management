import { Photo, PhotosResponse } from "@/types/photos";
import { apiUrl } from "./url";

export const fetchPhotos =
  (albumId: number) => async (): Promise<PhotosResponse> => {
    const response = await fetch(`${apiUrl}/albums/${albumId}/photos`);

    if (!response.ok) {
      throw new Error("Failed to fetch photos");
    }

    return response.json();
  };

export const addPhoto = async (photo: Photo): Promise<Photo> => {
  const response = await fetch(`${apiUrl}/photos`, {
    method: "POST",
    body: JSON.stringify({ ...photo, url: "placeholder" }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to add photo");
  }

  return response.json();
};

export const patchPhoto = async (photo: Photo): Promise<Photo> => {
  const response = await fetch(`${apiUrl}/photos/${photo.id}`, {
    method: "PATCH",
    body: JSON.stringify({ ...photo, url: "placeholder" }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to patch photo");
  }

  return response.json();
};

export const deletePhoto = async (photoId: number): Promise<Photo> => {
  const response = await fetch(`${apiUrl}/photos/${photoId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete photo");
  }

  return response.json();
};
