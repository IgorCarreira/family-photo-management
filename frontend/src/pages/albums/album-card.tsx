import { Album } from "@/types/albums";
import { AlbumIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface AlbumCardProps {
  album: Album;
}

export const AlbumCard = ({ album }: AlbumCardProps) => {
  return (
    <Link to={`/albums/${album.id}/photos`}>
      <div className="grid grid-cols-[20%_1fr] border rounded p-4 cursor-pointer hover:border-primary items-center gap-4 bg-card">
        <AlbumIcon className="size-10" />
        <div className="flex flex-col">
          <span className="select-none">{album.title}</span>
        </div>
      </div>
    </Link>
  );
};
