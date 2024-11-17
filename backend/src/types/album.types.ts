import { Photo } from "./photos.types";
import { User } from "./users.types";

export interface AlbumListResponse {
  user: User;
  albums: Partial<Album>[];
}

export interface AlbumGetResponse {
  id: number;
  title: string;
  user: Pick<User, "username">;
}

export interface Album {
  id: number;
  title: string;
  userId: number;
}

export interface GetAlbumPhotosResponse {
  album: AlbumGetResponse;
  photos: Photo[];
}
