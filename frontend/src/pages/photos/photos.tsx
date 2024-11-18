import { addPhoto, fetchPhotos } from "@/api/photos";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Photo, PhotosResponse } from "@/types/photos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CameraIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { SubmitHandler } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";
import { PhotoCard } from "./photo-card";
import { AddPhotoDialog } from "./add-photo-dialog";

export const Photos = () => {
  const { albumId } = useParams();
  const { state } = useLocation();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["photos", albumId],
    queryFn: albumId ? fetchPhotos(Number(albumId)) : undefined,
    enabled: () => !queryClient.getQueryData(["photos", albumId]),
  });

  const { mutateAsync: addPhotoFn } = useMutation({
    mutationFn: addPhoto,
    async onSuccess(_, variables) {
      const targetAlbumId = String(variables.albumId);

      if (targetAlbumId !== albumId) {
        const updatedPhotos = await queryClient.fetchQuery({
          queryKey: ["photos", targetAlbumId],
          queryFn: fetchPhotos(Number(targetAlbumId)),
        });

        queryClient.setQueryData(["photos", targetAlbumId], {
          ...updatedPhotos,
          photos: [...updatedPhotos.photos, variables],
        });
      } else {
        queryClient.setQueryData(
          ["photos", albumId],
          (data: PhotosResponse) => {
            return { ...data, photos: [...data.photos, variables] };
          }
        );
      }
    },
  });

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreate: SubmitHandler<Photo> = async (data) => {
    try {
      await addPhotoFn({
        ...data,
        id: Math.floor(Math.random() * 1000) + 100,
      });
      setIsCreateDialogOpen(false);
      toast.success("The photo has been added successfully.");
    } catch (error) {
      toast.error(
        "An error occurred while adding the photo. Please try again."
      );
    }
  };

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
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {state?.title || data?.album?.title || "Album"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {data?.album.user.username}'s album
            </p>
          </div>
          <Button
            className="flex gap-2"
            onClick={() => {
              setIsCreateDialogOpen(true);
            }}
          >
            <CameraIcon />
            <p>Add new photo</p>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
          {data?.photos?.map((photo) => (
            <PhotoCard photo={photo} key={photo.id} />
          ))}
        </div>
      </div>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <AddPhotoDialog handleCreate={handleCreate} />
      </Dialog>
    </>
  );
};
