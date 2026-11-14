import CreateTaskInput from "./CreateTaskInput";
import ViewNavigation from "./ViewNavigation";
import { Filters, Scope, View } from "../lib/url";
import TasksView from "./views/TasksView";

interface TaskScreenProps {
  scope: Scope;
  view: View;
  filters?: Filters;
}

const formattedDate = () => {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    weekday: "long",
    timeZone: "UTC",
  }).format(new Date());
};

const TaskScreen = async ({ scope, view, filters }: TaskScreenProps) => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 p-4 md:p-8">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-400">{formattedDate()}</span>
          <span className="text-2xl font-bold font-inter">All tasks</span>
        </div>
        <ViewNavigation scope={scope} view={view} />
      </div>
      <CreateTaskInput />

      <TasksView scope={scope} view={view} />
    </main>
  );
};

export default TaskScreen;
