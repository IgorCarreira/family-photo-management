import { deletePhoto, fetchPhotos, patchPhoto } from "@/api/photos";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Photo, PhotosResponse } from "@/types/photos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { PhotoPatchDialog } from "./photo-patch-dialog";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { PhotoDeleteAlertDialog } from "./photo-delete-alert-dialog";

interface PhotoCardProps {
  photo: Photo;
  isCurrentUser: boolean;
}

export const PhotoCard = ({ photo, isCurrentUser }: PhotoCardProps) => {
  const { albumId } = useParams();
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPatchDialogOpen, setIsPatchDialogOpen] = useState(false);

  const { mutateAsync: patchPhotoFn } = useMutation({
    mutationFn: patchPhoto,
    async onSuccess(_, variables) {
      const targetAlbumId = String(variables.albumId);

      if (targetAlbumId !== albumId) {
        const updatedPhotos = await queryClient.fetchQuery({
          queryKey: ["photos", targetAlbumId],
          queryFn: fetchPhotos(Number(targetAlbumId)),
        });

        queryClient.setQueryData(
          ["photos", albumId],
          (data: PhotosResponse) => {
            return {
              ...data,
              photos: data.photos.filter((photo) => photo.id !== variables.id),
            };
          }
        );

        queryClient.setQueryData(["photos", targetAlbumId], {
          ...updatedPhotos,
          photos: updatedPhotos.photos.map((photo) =>
            photo.id === variables.id ? { ...photo, ...variables } : photo
          ),
        });
      } else {
        queryClient.setQueryData(
          ["photos", albumId],
          (data: PhotosResponse) => {
            return {
              ...data,
              photos: data.photos.map((photo) =>
                photo.id === variables.id ? { ...photo, ...variables } : photo
              ),
            };
          }
        );
      }
    },
  });

  const { mutateAsync: deletePhotoFn } = useMutation({
    mutationFn: deletePhoto,
    async onSuccess() {
      queryClient.setQueryData(["photos", albumId], (data: PhotosResponse) => {
        return {
          ...data,
          photos: data.photos.filter((photoData) => photo.id !== photoData.id),
        };
      });
    },
  });

  const handleUpdate: SubmitHandler<Photo> = async (data) => {
    try {
      await patchPhotoFn({
        ...data,
        id: photo.id,
      });
      setIsPatchDialogOpen(false);
      toast.success("The photo has been edited successfully.");
    } catch (error) {
      toast.error(
        "An error occurred while editing the photo. Please try again."
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deletePhotoFn(photo.id);
      setIsDeleteDialogOpen(false);
      toast.success("The photo has been deleted successfully.");
    } catch (error) {
      toast.error(
        "An error occurred while deleting the photo. Please try again."
      );
    }
  };

  return (
    <div className="space-y-3 w-[150px] h-auto">
      <img
        src={photo.url}
        alt={photo.title}
        width={150}
        height={150}
        className={
          "h-auto w-auto object-cover transition-all hover:scale-105 aspect-square"
        }
      />
      <div className="grid grid-cols-[1fr_15%] space-y-1 text-sm">
        <p className="text-xs text-muted-foreground">{photo.title}</p>
        {isCurrentUser && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="flex justify-between"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsPatchDialogOpen(true);
                }}
              >
                <p>Edit</p>
                <Pencil />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-between text-red-500"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsDeleteDialogOpen(true);
                }}
              >
                <p>Delete</p>
                <Trash2 />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <Dialog open={isPatchDialogOpen} onOpenChange={setIsPatchDialogOpen}>
        <PhotoPatchDialog
          photo={{ ...photo, albumId: Number(albumId) }}
          handleUpdate={handleUpdate}
        />
      </Dialog>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <PhotoDeleteAlertDialog onContinue={handleDelete} />
      </AlertDialog>
    </div>
  );
};
