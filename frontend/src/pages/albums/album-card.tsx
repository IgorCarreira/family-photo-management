import { deleteAlbum, patchAlbum } from "@/api/albums";
import { useAuth } from "@/components/auth-context";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Album, AlbumResponse } from "@/types/albums";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlbumIcon, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { AlbumDeleteAlertDialog } from "./album-delete-alert-dialog";
import { AlbumPatchDialog } from "./album-patch-dialog";

interface AlbumCardProps {
  album: Album;
}

export const AlbumCard = ({ album }: AlbumCardProps) => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPatchDialogOpen, setIsPatchDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: deleteAlbumFn } = useMutation({
    mutationFn: deleteAlbum,
    onSuccess() {
      queryClient.setQueryData(["albums", userId], (data: AlbumResponse) => ({
        ...data,
        albums: data.albums.filter((albumData) => albumData.id !== album.id),
      }));
    },
  });

  const { mutateAsync: patchAlbumFn } = useMutation({
    mutationFn: patchAlbum,
    onSuccess(_, variables: Album) {
      queryClient.setQueryData(["albums", userId], (data: AlbumResponse) => ({
        ...data,
        albums: data.albums.map((album) =>
          album.id === variables.id ? { ...album, ...variables } : album
        ),
      }));
    },
  });

  const isCurrentUser = String(user?.id) === userId;

  const handleClickDelete = async () => {
    try {
      await deleteAlbumFn(album.id);
      setIsDeleteDialogOpen(false);
      toast.success("The album has been removed successfully.");
    } catch (error) {
      toast.error(
        "An error occurred while removing the album. Please try again."
      );
    }
  };
  const handleUpdate: SubmitHandler<Album> = async (data) => {
    try {
      await patchAlbumFn({ ...data, id: album.id });
      setIsPatchDialogOpen(false);
      toast.success("The album has been updated successfully.");
    } catch (error) {
      toast.error(
        "An error occurred while updating the album. Please try again."
      );
    }
  };

  return (
    <>
      <Link
        to={`/albums/${album.id}/photos`}
        state={{ title: album.title }}
        className="grid grid-cols-[15%_1fr_10%] border rounded p-4 cursor-pointer hover:border-primary items-center gap-4 bg-card"
      >
        <AlbumIcon className="size-10" />
        <div className="flex flex-col">
          <span className="select-none">{album.title}</span>
        </div>
        {isCurrentUser && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="flex justify-between cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsPatchDialogOpen(true);
                }}
              >
                <p>Edit</p>
                <Pencil />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-between text-red-500 cursor-pointer"
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
      </Link>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlbumDeleteAlertDialog onContinue={handleClickDelete} />
      </AlertDialog>
      <Dialog open={isPatchDialogOpen} onOpenChange={setIsPatchDialogOpen}>
        <AlbumPatchDialog album={album} handleUpdate={handleUpdate} />
      </Dialog>
    </>
  );
};
