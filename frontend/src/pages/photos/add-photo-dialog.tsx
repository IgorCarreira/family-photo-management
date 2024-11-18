import { fetchAlbums } from "@/api/albums";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ImageInputField } from "@/components/ui/form/image-input-field";
import { SelectField } from "@/components/ui/form/select-field";
import { TextInputField } from "@/components/ui/form/text-input-field";
import { Photo } from "@/types/photos";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import z from "zod";

const photoPatchSchema = z.object({
  title: z.string().min(1, "Required"),
  url: z
    .string()
    .nullable()
    .refine((value) => value, {
      message: "Required.",
    }),
  albumId: z.coerce.number(),
});

interface AddPhotoDialogProps {
  handleCreate: SubmitHandler<Photo>;
}

export const AddPhotoDialog = ({ handleCreate }: AddPhotoDialogProps) => {
  const { albumId } = useParams();
  const queryClient = useQueryClient();

  const { data: albumsOptions } = useQuery({
    queryKey: ["albums", 1],
    queryFn: fetchAlbums(Number(1)),
    enabled: () => !queryClient.getQueryData(["albums", 1]),
  });
  const form = useForm<Photo>({
    resolver: zodResolver(photoPatchSchema),
    defaultValues: { albumId: Number(albumId) },
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add photo</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          id="levelForm"
          onSubmit={form.handleSubmit(async (data) => {
            await handleCreate(data);
            form.reset();
          })}
          className="flex flex-col gap-2"
        >
          <ImageInputField
            control={form.control}
            name="url"
            label="Photo"
            className="w-full"
          />

          <TextInputField
            label="Title"
            name="title"
            control={form.control}
            className="w-full"
          />

          <SelectField
            label="Album"
            name="albumId"
            control={form.control}
            options={albumsOptions?.albums || []}
            labelKey="title"
            valueKey="id"
          />
        </form>
      </Form>
      <Button type="submit" size="sm" className="ml-auto" form="levelForm">
        Add
      </Button>
    </DialogContent>
  );
};
