import { fetchPhotos } from "@/api/photos";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { PhotoCard } from "./photo-card";

export const Photos = () => {
  const { albumId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["photos", albumId],
    queryFn: albumId ? fetchPhotos(Number(albumId)) : undefined,
  });

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <>
      <Helmet title={`${data?.album.user.username || "User"}'s photos`} />
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {data?.album?.title || "Album"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {data?.album.user.username}'s album
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
          {data?.photos?.map((photo) => (
            <PhotoCard photo={photo} key={photo.id} />
          ))}
        </div>
      </div>
    </>
  );
};
