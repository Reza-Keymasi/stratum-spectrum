"use client";

import { Filters, Scope, View } from "../../lib/url";
import { VIEW_COMPONENTS } from "./registry";

interface TasksViewProps {
  scope: Scope;
  view: View;
  filters?: Filters;
}

const TasksView = ({ scope, view }: TasksViewProps) => {
  const ViewComponent = VIEW_COMPONENTS[view] ?? VIEW_COMPONENTS.overview;

  return <ViewComponent scope={scope} />;
};

export default TasksView;
