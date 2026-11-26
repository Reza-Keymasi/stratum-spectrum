import { useState } from "react";
import { Plus, X } from "lucide-react";

import AppInput from "@/shared/ui/AppInput";
import EditableInput from "@/shared/ui/EditableInput";
import AppCheckbox from "@/shared/ui/AppCheckbox";
import ProgressBar from "@/shared/ui/ProgressBar";
import { cn } from "@/lib/utils";
import { useSubTasks } from "../../hooks/useTaskManagementQueries";
import { GetSubTask } from "../../types/task.schema";
import { Button } from "@/components/ui/button";

interface SubTasksProps {
  subTasks: GetSubTask[];
  taskId: string;
}

const SubTasks = ({ taskId, subTasks }: SubTasksProps) => {
  const [value, setValue] = useState("");
  const { add, remove, update } = useSubTasks(taskId);

  const handleSubmit = () => {
    const title = value.trim();
    if (!value) return;
    setValue("");
    add.mutate(title);
  };

  const doneSubTasks = subTasks?.filter((sub) => sub.done === true).length;
  const allSubTasks = subTasks?.length;
  const percent = subTasks.length ? (doneSubTasks / allSubTasks) * 100 : 0;

  return (
    <div className="">
      <>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-gray-400 uppercase">subtasks</span>
          {subTasks.length > 0 && (
            <span className="text-[10px] text-gray-400">
              {doneSubTasks}/{allSubTasks}
            </span>
          )}
        </div>

        <ProgressBar
          value={percent}
          indicatorClassName="**:data-[slot=progress-indicator]:bg-green-accent-500 bg-gray-100 "
        />
      </>

      <ul className="flex flex-col mt-5">
        {subTasks?.map((sub) => (
          <li key={sub._id} className="flex items-center ">
            <AppCheckbox
              className="w-5 h-5"
              checked={sub.done}
              onChange={(done: boolean) =>
                update.mutate({ subId: sub._id, payload: { done } })
              }
            />
            <EditableInput
              value={sub.title}
              onCommit={(title: string) =>
                update.mutate({ subId: sub._id, payload: { title } })
              }
              className={cn(sub.done ? "text-gray-500 line-through" : "")}
              disabled={sub.done}
            />
            <Button
              variant="ghost"
              size="icon-xs"
              className="cursor-pointer bg-red-50 text-red-500 hover:bg-red-100"
              onClick={() => remove.mutate(sub._id)}
            >
              <X />{" "}
            </Button>
          </li>
        ))}
      </ul>

      <div className="flex items-center">
        <Plus className="size-4 text-gray-400" />
        <AppInput
          name="addSubtask"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              (e.preventDefault(), handleSubmit());
            }
          }}
          placeholder="Add subtask and press Enter"
          className="bg-transparent! shadow-none border-none"
        />
      </div>
    </div>
  );
};

export default SubTasks;
