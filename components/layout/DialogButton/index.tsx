import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
  DialogClose,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";

interface IDialogButtonProps {
  title: string;
  description: string;
  bodyElement?: React.ReactNode;
  anotherFooterButtonElement?: React.ReactNode;
  variant?: "outline" | "destructive" | "secondary" | "ghost" | "link";
}

export function DialogButton({
  title,
  description,
  bodyElement,
  anotherFooterButtonElement,
  variant = "outline",
}: IDialogButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant}>{title}</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          {bodyElement}
          <Field>
            {anotherFooterButtonElement}
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
          </Field>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
