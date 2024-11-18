import { PhotosResponse } from "@/types/photos";
import { apiUrl } from "./url";

export const fetchPhotos =
  (albumId: number) => async (): Promise<PhotosResponse> => {
    const response = await fetch(`${apiUrl}/albums/${albumId}/photos`);

    if (!response.ok) {
      throw new Error("Failed to fetch photos");
    }

    return response.json();
  };
