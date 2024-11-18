import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { SubmitFormButton } from "@/components/ui/form/submit-form-button";
import { TextInputField } from "@/components/ui/form/text-input-field";
import { Album } from "@/types/albums";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const albumPatchSchema = z.object({
  title: z.string().min(1, "Required"),
});

interface AlbumPatchDialogProps {
  album: Album;
  handleUpdate: SubmitHandler<Album>;
}

export const AlbumPatchDialog = ({
  album,
  handleUpdate,
}: AlbumPatchDialogProps) => {
  const form = useForm<Album>({
    defaultValues: album,
    resolver: zodResolver(albumPatchSchema),
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit album</DialogTitle>
      </DialogHeader>

      <DialogDescription hidden>Patch album form</DialogDescription>

      <Form {...form}>
        <form
          id="levelForm"
          onSubmit={form.handleSubmit(handleUpdate)}
          className="flex"
        >
          <TextInputField
            label="Title"
            name="title"
            control={form.control}
            className="w-full"
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
