import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useGetTasks, useUpdateTask } from "../hooks/useTaskManagementQueries";
import { Task, TaskStatus } from "../types/task.schema";
import { useDragAndDrop } from "@/shared/hooks/useDragAndDrop";
import AppCard from "@/shared/ui/AppCard";
import TaskCard from "./TaskCard";
import TaskOperationModal from "./modals/TaskOperationsModal";

const statusLabels: Record<TaskStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
};

const TasksGrid = () => {
  const queryClient = useQueryClient();
  const { data: tasks = [], isPending: isGetTaskPending } = useGetTasks();

  const { mutate: updateTask } = useUpdateTask({
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previous = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((t) => (t._id === id ? { ...t, ...payload } : t)),
      );

      return { previous };
    },
  });

  const { draggedId, overId, getDragProps, getDropProps } = useDragAndDrop({
    onDrop: (taskId, toStatus) => {
      updateTask({
        id: taskId,
        payload: { status: toStatus as TaskStatus },
      });
    },
  });

  const groupedTasks = useMemo(
    () => ({
      todo: tasks.filter((task) => task.status === "todo"),
      in_progress: tasks.filter((task) => task.status === "in_progress"),
      done: tasks.filter((task) => task.status === "done"),
    }),
    [tasks],
  );

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {(Object.keys(groupedTasks) as TaskStatus[]).map((status) => (
        <div
          key={status}
          {...getDropProps(status)}
          className={`transition-colors rounded-xl ${
            overId === status ? "ring-1 ring-sky-400 bg-sky-200/20" : ""
          }`}
        >
          <AppCard
            key={status}
            cardTitle={statusLabels[status]}
            cardClassName="shadow-none border-gray-300 pt-3 gap-2 h-[500px] overflow-y-auto"
            cardTitleClassName="text-sm text-gray-500 bg-gray-300/20 rounded-md px-2 py-1 w-fit"
            contentClassName="flex flex-col gap-3 px-2"
            cardHeaderClassName="px-2"
          >
            {groupedTasks[status].map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                dragProps={getDragProps(task._id, status)}
                isDragging={draggedId === task._id}
                isDraggable
              />
            ))}
          </AppCard>
        </div>
      ))}

      <TaskOperationModal />
    </div>
  );
};

export default TasksGrid;
