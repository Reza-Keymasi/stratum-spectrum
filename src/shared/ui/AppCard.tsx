import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AppCardProps {
  cardTitle?: string | ReactNode;
  cardDescription?: string;
  cardClassName?: string;
  contentClassName?: string;
  cardTitleClassName?: string;
  cardHeaderClassName?: string;
  cardDescriptionClassName?: string;
  children?: ReactNode;
}

const AppCard = ({
  cardTitle,
  cardDescription,
  cardClassName = "",
  contentClassName = "",
  cardTitleClassName = "",
  cardHeaderClassName = "",
  cardDescriptionClassName = "",
  children,
}: AppCardProps) => {
  return (
    <Card className={cn(cardClassName)}>
      <CardHeader className={cn(cardHeaderClassName)}>
        <CardTitle className={cn(cardTitleClassName)}>{cardTitle}</CardTitle>
        <CardDescription className={cn(cardDescriptionClassName)}>
          {cardDescription}
        </CardDescription>
      </CardHeader>

      {children && (
        <CardContent className={cn(contentClassName)}>{children}</CardContent>
      )}
    </Card>
  );
};

export default AppCard;
