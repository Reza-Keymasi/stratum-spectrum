import { Flag } from "lucide-react";

import { TaskPriorities, TaskPriority } from "../../types/task.schema";
import { TaskPrioritiesMap } from "../../constants";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

interface TaskPriorityToggleProps {
  onChangePriority: (priority: TaskPriority) => void;
  taskPriority: TaskPriority;
}

const TaskPriorityToggle = ({
  taskPriority,
  onChangePriority,
}: TaskPriorityToggleProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] text-gray-400 uppercase">priority</span>
      <div className="flex gap-2">
        {TaskPriorities.map((p) => {
          const { priority, priorityStyle, currentTaskActivePriorityStyles } =
            TaskPrioritiesMap[p];
          const currentTaskActiveStatus = p === taskPriority;
          return (
            <Button
              variant="ghost"
              key={priority}
              className={cn(
                "flex items-center gap-1 text-xs border rounded-md px-2 py-1 cursor-pointer",
                currentTaskActiveStatus
                  ? currentTaskActivePriorityStyles
                  : "border-gray-400 bg-transparent",
              )}
              onClick={() => onChangePriority(p)}
            >
              <Flag className={cn("w-2 h-2 rounded-full", priorityStyle)} />
              <span>{priority}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TaskPriorityToggle;
