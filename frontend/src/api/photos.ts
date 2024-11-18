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

export const addPhoto = async (album: Photo): Promise<Photo> => {
  const response = await fetch(`${apiUrl}/photos`, {
    method: "POST",
    body: JSON.stringify({ ...album, url: "placeholder" }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to add photo");
  }

  return response.json();
};
