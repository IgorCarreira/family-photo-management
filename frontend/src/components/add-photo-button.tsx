import { addPhoto, fetchPhotos } from "@/api/photos";
import { AddPhotoDialog } from "@/pages/photos/add-photo-dialog";
import { Photo, PhotosResponse } from "@/types/photos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImageUp } from "lucide-react";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "./auth-context";
import { Button } from "./ui/button";
import { Dialog } from "./ui/dialog";

interface AddPhotoButtonProps {
  label?: string;
}

export const AddPhotoButton = ({ label }: AddPhotoButtonProps) => {
  const { user } = useAuth();
  const { albumId } = useParams();
  const queryClient = useQueryClient();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { mutateAsync: addPhotoFn } = useMutation({
    mutationFn: addPhoto,
    async onSuccess(_, variables) {
      const targetAlbumId = String(variables.albumId);

      try {
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
      } catch (error) {
        queryClient.setQueryData(
          ["photos", targetAlbumId],
          (data: PhotosResponse | undefined) => {
            const photos = data ? data.photos : [];
            return { ...data, photos: [...photos, variables] };
          }
        );
      }
    },
  });

  const handleCreate: SubmitHandler<Photo> = async (data) => {
    try {
      await addPhotoFn({
        ...data,
        id: Math.floor(Math.random() * 1000) + 100,
      });
      setIsCreateDialogOpen(false);
      toast.success("The photo has been added successfully.");
    } catch (error) {
      console.log({ error });
      toast.error(
        "An error occurred while adding the photo. Please try again."
      );
    }
  };

  if (!user) return null;

  return (
    <>
      <Button
        className="flex gap-2"
        onClick={() => {
          setIsCreateDialogOpen(true);
        }}
        aria-label="Add new photo"
      >
        <ImageUp />
        {label && <p>Add new photo</p>}
      </Button>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <AddPhotoDialog handleCreate={handleCreate} />
      </Dialog>
    </>
  );
};
