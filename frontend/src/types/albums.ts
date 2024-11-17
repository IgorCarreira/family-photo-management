import { User } from "./user";

export interface Album {
  id: number;
  title: string;
  userId: number;
}

export interface AlbumResponse {
  user: User;
  albums: Album[];
}
