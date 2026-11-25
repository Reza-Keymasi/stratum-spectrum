import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { TaskStatusMap } from "../../constants";
import { TaskStatus, TaskStatuses } from "../../types/task.schema";

interface TaskStatusToggleProps {
  taskStatus: TaskStatus;
  onChangeStatus: (taskStatus: TaskStatus) => void;
}

const TaskStatusToggle = ({
  taskStatus,
  onChangeStatus,
}: TaskStatusToggleProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] text-gray-400 uppercase">status</span>
      <div className="flex gap-2">
        {TaskStatuses.map((s) => {
          const { status, statusStyle, currentTaskActiveStatusStyles } =
            TaskStatusMap[s];
          const currentTaskActiveStatus = s === taskStatus;
          return (
            <Button
              variant="ghost"
              key={status}
              className={cn(
                "flex items-center gap-1 text-xs border rounded-md px-2 py-1 cursor-pointer",
                currentTaskActiveStatus
                  ? currentTaskActiveStatusStyles
                  : "border-gray-400 bg-transparent",
              )}
              onClick={() => onChangeStatus(s)}
            >
              <div className={cn("w-2 h-2 rounded-full", statusStyle)} />
              <span>{status}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TaskStatusToggle;
