import { AlbumResponse } from "@/types/albums";
import { apiUrl } from "./url";

export const fetchAlbums =
  (userId: number) => async (): Promise<AlbumResponse> => {
    const response = await fetch(`${apiUrl}/users/${userId}/albums`);

    if (!response.ok) {
      throw new Error("Failed to fetch albums");
    }

    return response.json();
  };
