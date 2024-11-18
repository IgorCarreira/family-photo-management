import { fetchAlbums } from "@/api/albums";
import { useAuth } from "@/components/auth-context";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ImageInputField } from "@/components/ui/form/image-input-field";
import { SelectField } from "@/components/ui/form/select-field";
import { SubmitFormButton } from "@/components/ui/form/submit-form-button";
import { TextInputField } from "@/components/ui/form/text-input-field";
import { Photo } from "@/types/photos";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
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

interface PhotoPatchDialogProps {
  handleUpdate: SubmitHandler<Photo>;
  photo: Photo;
}

export const PhotoPatchDialog = ({
  handleUpdate,
  photo,
}: PhotoPatchDialogProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: albumsOptions } = useQuery({
    queryKey: ["albums", String(user?.id)],
    queryFn: fetchAlbums(Number(user?.id)),
    enabled: () => !queryClient.getQueryData(["albums", String(user?.id)]),
  });

  const form = useForm<Photo>({
    resolver: zodResolver(photoPatchSchema),
    defaultValues: photo,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit photo</DialogTitle>
      </DialogHeader>

      <DialogDescription hidden>Patch photo form</DialogDescription>

      <Form {...form}>
        <form
          id="levelForm"
          onSubmit={form.handleSubmit(async (data) => {
            await handleUpdate(data);
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
      <SubmitFormButton
        className="ml-auto"
        form="levelForm"
        isSubmitting={form.formState.isSubmitting}
      >
        Apply
      </SubmitFormButton>
    </DialogContent>
  );
};
