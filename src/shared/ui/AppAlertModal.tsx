import { ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type AlertVariants =
  | "link"
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | null
  | undefined;

interface AppAlertModalProps {
  AlertTriggerTitle?: string;
  AlertTriggerVariant?: AlertVariants;
  AlertCancelButtonVariant?: AlertVariants;
  AlertActionVariant?: AlertVariants;
  AlertActionTitle: string;
  AlertTitle: string;
  AlertDescription?: string;
  AlertMedia?: ReactNode;

  hasTriggerButton?: boolean;
  open: boolean;
  onClose: () => void;
  onClickAction: () => void;
}

const AppAlertModal = ({
  AlertTriggerTitle,
  AlertTriggerVariant = "default",
  AlertTitle,
  AlertDescription,
  AlertMedia,
  AlertCancelButtonVariant = "outline",
  AlertActionVariant,
  AlertActionTitle,
  hasTriggerButton = false,
  onClickAction,
  open,
  onClose,
}: AppAlertModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      {hasTriggerButton && (
        <AlertDialogTrigger asChild>
          <Button variant={AlertTriggerVariant}>{AlertTriggerTitle}</Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            {AlertMedia}
          </AlertDialogMedia>
          <AlertDialogTitle>{AlertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{AlertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant={AlertCancelButtonVariant}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant={AlertActionVariant}
            onClick={onClickAction}
          >
            {AlertActionTitle}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppAlertModal;
