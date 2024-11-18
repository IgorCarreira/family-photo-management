import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "../button";

interface SubmitFormButtonProps {
  children: ReactNode;
  form: string;
  className?: string;
  isSubmitting: boolean;
}

export const SubmitFormButton = ({
  children,
  form,
  className,
  isSubmitting,
}: SubmitFormButtonProps) => {
  return (
    <Button
      type="submit"
      size="sm"
      className={className}
      form={form}
      disabled={isSubmitting}
    >
      {isSubmitting ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
};
