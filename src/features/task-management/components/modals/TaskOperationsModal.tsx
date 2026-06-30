import { Trash2Icon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import AddStepToTask from "../AddStepToTask";
import AppModal from "@/shared/ui/AppModal";
import AppAlertModal from "@/shared/ui/AppAlertModal";
import CreateAndEditTaskForm from "../CreateAndEditTaskForm";
import { useTaskStore } from "../../store/useTaskStore";
import { useDeleteTask } from "../../hooks/useTaskManagementQueries";
import { Task } from "../../types/task.schema";

const modalTitleMap = {
  create: "Create a task",
  add_step: "Add step to",
  edit: "Edit",
};

const TaskOperationsModal = ({
  learningPathId,
}: {
  learningPathId?: string;
}) => {
  const queryClient = useQueryClient();

  const activeTask = useTaskStore((state) => state.activeTask);
  const currentView = useTaskStore((state) => state.currentView);
  const closeModal = useTaskStore((state) => state.closeModal);

  const cacheKey = learningPathId ? ["tasks", learningPathId] : ["tasks"];

  const { mutate, isPending: isDeletePending } = useDeleteTask();

  const allTasks = queryClient.getQueryData<Task[]>(cacheKey);

  const freshTask =
    allTasks?.find((t) => t._id === activeTask?._id) || activeTask;

  const isAlert = currentView === "delete";

  const handleDeleteTask = () => {
    mutate(activeTask?._id as string);
  };

  if (!currentView) return null;

  const isCreateView = currentView === "create";

  if (!isCreateView && (!freshTask || !activeTask)) return null;

  if (!isAlert) {
    return (
      <AppModal
        open={!!currentView}
        onClose={closeModal}
        title={`${modalTitleMap[currentView!]} ${activeTask?.title ?? ""}`}
        description={
          currentView === "create" || currentView === "edit"
            ? undefined
            : activeTask?.description || "No description for this task yet."
        }
      >
        {currentView === "add_step" && freshTask && (
          <AddStepToTask selectedTask={freshTask} />
        )}

        {(currentView === "create" || currentView === "edit") && (
          <CreateAndEditTaskForm
            key={currentView === "edit" ? freshTask?._id : "create-view"}
            initialData={currentView === "edit" ? freshTask : null}
            closeModal={() => closeModal()}
          />
        )}
      </AppModal>
    );
  } else {
    return (
      <AppAlertModal
        AlertActionTitle="Delete"
        AlertMedia={<Trash2Icon />}
        AlertTriggerVariant="destructive"
        AlertDescription="This action will delete this task. Are you sure?"
        AlertTitle={`Delete task ${activeTask?.title}`}
        onClickAction={handleDeleteTask}
        open={!!currentView}
        onClose={closeModal}
        AlertActionVariant="destructive"
      />
    );
  }
};

export default TaskOperationsModal;
