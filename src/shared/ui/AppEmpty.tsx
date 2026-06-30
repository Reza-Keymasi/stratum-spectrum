import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

interface AppEmptyProps {
  emptyMedia?: ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  children?: ReactNode;

  emptyClassName?: String;
  emptyHeaderClassName?: string;
}

const AppEmpty = ({
  emptyTitle = "",
  emptyAction,
  emptyDescription,
  emptyMedia,
  emptyClassName = "",
  emptyHeaderClassName = "",
  children,
}: AppEmptyProps) => {
  return (
    <Empty className={cn(emptyClassName)}>
      <EmptyHeader className={cn(emptyHeaderClassName)}>
        {emptyMedia ? (
          <EmptyMedia variant="icon">{emptyMedia}</EmptyMedia>
        ) : null}
        <EmptyTitle>{emptyTitle}</EmptyTitle>
        <EmptyDescription>{emptyDescription}</EmptyDescription>
      </EmptyHeader>
      {children ? (
        <EmptyContent className="flex-row justify-center gap-2">
          {children}
        </EmptyContent>
      ) : null}
      {emptyAction && (
        <Button
          variant="link"
          asChild
          className="text-muted-foreground"
          size="sm"
        >
          {emptyAction}
        </Button>
      )}
    </Empty>
  );
};

export default AppEmpty;
