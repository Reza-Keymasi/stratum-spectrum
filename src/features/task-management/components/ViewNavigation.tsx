import { ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { KanbanSquareDashed, LayoutDashboard, Logs } from "lucide-react";
import { Scope, scopeHref, VIEWS, View } from "../lib/url";
import { cn } from "@/lib/utils";

interface ViewNavigationProps {
  scope: Scope;
  view: View;
}

const ViewsMap: Record<View, { view: View; icon: ReactNode }> = {
  overview: { view: "overview", icon: <LayoutDashboard className="size-4" /> },
  list: { view: "list", icon: <Logs className="size-4" /> },
  board: { view: "board", icon: <KanbanSquareDashed className="size-4" /> },
};

const ViewNavigation = ({ scope, view }: ViewNavigationProps) => {
  const queryString = useSearchParams();
  return (
    <nav className="flex gap-2 bg-green-100 w-fit p-2 rounded-md">
      {VIEWS.map((v) => (
        <Link
          key={v}
          href={`${scopeHref(scope, v)}${queryString ? `?${queryString}` : ""}`}
          className={cn(
            "flex items-center gap-1 text-xs font-semibold p-2 rounded-sm",
            v === view ? "bg-white" : "text-gray-500",
          )}
          aria-selected={v === view}
        >
          {ViewsMap[v].icon}
          <span className="capitalize">{ViewsMap[v].view}</span>
        </Link>
      ))}
    </nav>
  );
};

export default ViewNavigation;
