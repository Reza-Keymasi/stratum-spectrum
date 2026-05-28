import { ReactNode } from "react";
import { PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AppModalProps {
  open: boolean;
  onClose: () => void;
  hasTriggerButton?: boolean;
  title: string;
  headerClassName?: string;
  description?: string;
  triggerTitle?: string;
  modalContentClassName?: string;
  children: ReactNode;
}

const AppModal = ({
  open,
  onClose,
  hasTriggerButton = false,
  title,
  description,
  triggerTitle,
  modalContentClassName = "",
  headerClassName = "",
  children,
}: AppModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      {hasTriggerButton && (
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-fit font-semibold text-xs text-gray-300 hover:text-gray-500 transition-all duration-300"
          >
            <PlusIcon /> {triggerTitle}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className={cn(modalContentClassName)}>
        <DialogHeader className={cn(headerClassName)}>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default AppModal;
