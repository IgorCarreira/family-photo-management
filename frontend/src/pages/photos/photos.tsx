import { fetchPhotos } from "@/api/photos";
import { AddPhotoButton } from "@/components/add-photo-button";
import { useAuth } from "@/components/auth-context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import { PhotoCard } from "./photo-card";

export const Photos = () => {
  const { user } = useAuth();
  const { albumId } = useParams();
  const { state } = useLocation();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["photos", albumId],
    queryFn: albumId ? fetchPhotos(Number(albumId)) : undefined,
    enabled: () => !queryClient.getQueryData(["photos", albumId]),
  });

  const isCurrentUser = user?.id === data?.album.user.id;

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
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {state?.title || data?.album?.title || "Album"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isCurrentUser
                ? "My album"
                : `${data?.album.user.username}'s album`}
            </p>
          </div>
          {isCurrentUser && <AddPhotoButton label="Add new photo" />}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {data?.photos?.map((photo) => (
            <PhotoCard
              photo={photo}
              isCurrentUser={isCurrentUser}
              key={photo.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};
