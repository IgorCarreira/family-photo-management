import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ImageInputFieldProps {
  control: any;
  name: string;
  label: string;
  className?: string;
}

export const ImageInputField = ({
  control,
  name,
  label,
  className,
}: ImageInputFieldProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const initialValue = control._defaultValues[name];
    if (typeof initialValue === "string") {
      setPreview(initialValue);
    }
  }, [control, name]);

  const handlePreview = (
    file: File | null,
    onChange: (value: string | null) => void
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      onChange(null);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", className)}>
          <FormLabel>{label}</FormLabel>

          <input
            type="file"
            accept="image/*"
            id={name}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              handlePreview(file, field.onChange);
            }}
          />

          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById(name)?.click()}
          >
            {preview ? "Change Image" : "Select Image"}
          </Button>

          {preview && (
            <div className="mt-2 w-full flex flex-col justify-center items-center">
              <img
                src={preview}
                alt="Preview"
                className="size-24 rounded object-cover"
              />
              <Button
                type="button"
                variant="ghost"
                className="mt-2"
                onClick={() => {
                  setPreview(null);
                  field.onChange(null);
                }}
              >
                Remove
              </Button>
            </div>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
