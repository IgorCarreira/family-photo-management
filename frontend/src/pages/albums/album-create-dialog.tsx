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

interface AlbumCreateDialogProps {
  handleCreate: SubmitHandler<Album>;
}

export const AlbumCreateDialog = ({ handleCreate }: AlbumCreateDialogProps) => {
  const form = useForm<Album>({
    resolver: zodResolver(albumPatchSchema),
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create album</DialogTitle>
      </DialogHeader>
      <DialogDescription hidden>Create album form</DialogDescription>

      <Form {...form}>
        <form
          id="levelForm"
          onSubmit={form.handleSubmit(handleCreate)}
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
        Create
      </SubmitFormButton>
    </DialogContent>
  );
};
