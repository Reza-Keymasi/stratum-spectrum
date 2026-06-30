import { Task, TaskCard } from "@/features/task-management";
import { cn } from "@/lib/utils";
import AppEmpty from "@/shared/ui/AppEmpty";

interface TasksTimeLineProps {
  tasks: Task[];
}

const PathTasksTimeLine = ({ tasks }: TasksTimeLineProps) => {
  return (
    <section className="relative md:px-16 my-10 border-slate-200 dark:border-slate-700">
      {tasks?.length > 0 ? (
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-300 dark:bg-slate-700"></div>
      ) : null}

      {tasks?.map((task, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={task._id}
            className={cn(
              "flex items-center justify-between w-full",
              isEven ? "flex-row-reverse" : "",
            )}
          >
            <div className="w-5/12"></div>

            {/* 3. The Central Timeline Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 z-10"></div>

            <div className="w-5/12">
              <TaskCard key={task._id} task={task} showStatus />
            </div>
          </div>
        );
      })}

      {!tasks?.length ? (
        <AppEmpty
          emptyTitle="No tasks yet"
          emptyDescription="Add your first micro-goal and break your learning into manageable
              chunks."
          emptyClassName="border border-2 border-dashed w-1/2 mx-auto"
        />
      ) : null}
    </section>
  );
};

export default PathTasksTimeLine;
