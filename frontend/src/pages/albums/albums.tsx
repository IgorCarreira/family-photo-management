import { createAlbum, fetchAlbums } from "@/api/albums";
import { useAuth } from "@/components/auth-context";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Album, AlbumResponse } from "@/types/albums";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { AlbumCard } from "./album-card";
import { AlbumCreateDialog } from "./album-create-dialog";

export const Albums = () => {
  const { user } = useAuth();
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["albums", userId],
    queryFn: userId ? fetchAlbums(Number(userId)) : undefined,
    enabled: () => !queryClient.getQueryData(["albums", userId]),
  });
  const { mutateAsync: createAlbumFn } = useMutation({
    mutationFn: createAlbum,
    onSuccess(_, variables) {
      queryClient.setQueryData(["albums", userId], (data: AlbumResponse) => ({
        ...data,
        albums: [...data.albums, variables],
      }));
    },
  });

  const isCurrentUser = String(user?.id) === userId;

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreate: SubmitHandler<Album> = async (data) => {
    try {
      const id = Math.floor(Math.random() * 1000) + 100;
      await createAlbumFn({
        ...data,
        id,
      });
      queryClient.setQueryData(
        ["photos", String(id)],
        (cachedData: AlbumResponse) => {
          if (!cachedData) return { album: { ...data, id, user }, photos: [] };
        }
      );
      setIsCreateDialogOpen(false);
      toast.success("The album has been created successfully.");
    } catch (error) {
      toast.error(
        "An error occurred while creating the album. Please try again."
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
      <Helmet title={`${data?.user?.username || "User"}'s albums`} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight">
              {isCurrentUser
                ? "My albums"
                : `${data?.user?.username || "User"}'s albums`}
            </h1>
            {data?.user?.email && (
              <p className="text-sm text-muted-foreground">
                {data?.user?.email}
              </p>
            )}
          </div>
          {isCurrentUser && (
            <Button
              className="flex gap-2"
              onClick={() => {
                setIsCreateDialogOpen(true);
              }}
            >
              <PlusCircle />
              <p>Create new album</p>
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 xl:grid-cols-4">
          {data?.albums?.map((album) => (
            <AlbumCard album={album} key={album.id} />
          ))}
        </div>
      </div>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <AlbumCreateDialog handleCreate={handleCreate} />
      </Dialog>
    </>
  );
};
