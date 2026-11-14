import { ComponentType } from "react";
import dynamic from "next/dynamic";

import { Filters, Scope, View } from "../../lib/url";

export interface ViewProps {
  scope: Scope;
  filters?: Filters;
}

export const VIEW_COMPONENTS = {
  overview: dynamic(() => import("./TaskOverview")),
  list: dynamic(() => import("./TaskListView")),
  board: dynamic(() => import("./TaskBoardView")),
} satisfies Record<View, ComponentType<ViewProps>>;
