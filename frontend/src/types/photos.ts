import { Album } from "./albums";

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface PhotosResponse {
  album: Album & { user: { id: number; username: string } };
  photos: Photo[];
}
