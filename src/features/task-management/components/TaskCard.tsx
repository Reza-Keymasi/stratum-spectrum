import { Trash2, InfoIcon, LucideEdit } from "lucide-react";
import { DragEvent } from "react";

import { Task, TaskPriority, TaskStatus } from "../types/task.schema";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "../store/useTaskStore";
import { cn } from "@/lib/utils";

const statusLabels: Record<TaskStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
};

const priorityClassMap: Record<TaskPriority, string> = {
  low: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  high: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

interface DragProps {
  draggable: boolean;
  onDragStart: (e: DragEvent) => void;
  onDragEnd: () => void;
}

interface TaskCardProps {
  task: Task;
  showStatus?: boolean;
  dragProps?: DragProps;
  isDragging?: boolean;
  isDraggable?: boolean;
}

const TaskCard = ({
  task,
  showStatus = false,
  dragProps,
  isDragging,
  isDraggable,
}: TaskCardProps) => {
  const openModal = useTaskStore((state) => state.openModal);
  return (
    <div
      {...dragProps}
      className={cn(
        "rounded-lg border shadow-2xs shadow-gray-300 p-3 transition-opacity",
        isDragging ? "opacity-40" : "opacity-100",
        isDraggable ? "cursor-grab" : "cursor-pointer",
      )}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex flex-col gap-2">
          <p className="px-2 py-1 rounded-md text-start bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-500 text-ellipsis line-clamp-2">
            {task.title}
          </p>
          {task?.learningPath ? (
            <span className="text-xs bg-neutral-200 text-gray-600 text-ellipsis px-2 py-1 rounded-md line-clamp-2">
              path - {task.learningPath.title}
            </span>
          ) : null}
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityClassMap[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>
      <div
        className={cn("flex", showStatus ? "justify-between" : "justify-end")}
      >
        {showStatus ? (
          <div className="flex items-center gap-2">
            <span className="bg-neutral-100 rounded-md border px-3 py-1 text-left text-sm font-semibold">
              {statusLabels[task.status]}
            </span>
            <span className="text-sm bg-neutral-100 text-sky-400 px-3 py-1 rounded-md">
              {task.steps.length > 0
                ? `${task.steps.length} Steps`
                : "No steps yet"}
            </span>
          </div>
        ) : null}
        <div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => openModal(task, "add_step")}
          >
            <InfoIcon className="text-gray-400" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => openModal(task, "edit")}
          >
            <LucideEdit className="text-sky-500" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => openModal(task, "delete")}
          >
            <Trash2 className="text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
