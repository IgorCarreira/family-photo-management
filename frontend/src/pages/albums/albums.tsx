import { fetchAlbums } from "@/api/albums";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { AlbumCard } from "./album-card";

export const Albums = () => {
  const { userId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["albums", userId],
    queryFn: userId ? fetchAlbums(Number(userId)) : undefined,
  });

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <>
      <Helmet title={`${data?.user?.username || "User"}'s albums`} />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {data?.user?.username || "User"}'s albums
        </h1>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 xl:grid-cols-4">
          {data?.albums?.map((album) => (
            <AlbumCard album={album} key={album.id} />
          ))}
        </div>
      </div>
    </>
  );
};
