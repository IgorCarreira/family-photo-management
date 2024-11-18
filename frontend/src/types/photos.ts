import { Album } from "./albums";

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface PhotosResponse {
  album: Album & { user: { username: string } };
  photos: Photo[];
}
