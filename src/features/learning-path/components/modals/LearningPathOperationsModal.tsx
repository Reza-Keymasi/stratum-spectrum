import AppModal from "@/shared/ui/AppModal";
import { useLearningPathStore } from "../../store/useLearningPathStore";
import AppAlertModal from "@/shared/ui/AppAlertModal";
import { Trash2Icon } from "lucide-react";
import CreateLearningPathForm from "../CreateLearningPathForm";
import { useDeleteLearningPath } from "../../hooks/useLearningPath";

const modalTitleMap = {
  "create-path": "Create a learning path",
  edit: "Edit",
};

const LearningPathOperationsModal = () => {
  const activePath = useLearningPathStore((state) => state.activePath);
  const currentView = useLearningPathStore((state) => state.currentView);
  const closeModal = useLearningPathStore((state) => state.closeModal);

  const { mutate: deletePath } = useDeleteLearningPath();

  const handleDeletePath = () => {
    deletePath(activePath?._id as string);
  };

  const isAlert = currentView === "delete";

  if (!isAlert) {
    return (
      <AppModal
        open={!!currentView}
        onClose={closeModal}
        title={`${modalTitleMap[currentView!]} ${activePath?.title ?? ""}`}
        headerClassName="text-gray-700"
      >
        {currentView === "create-path" && <CreateLearningPathForm />}
      </AppModal>
    );
  } else {
    return (
      <AppAlertModal
        AlertActionTitle="Delete"
        AlertMedia={<Trash2Icon />}
        AlertTriggerVariant="destructive"
        AlertDescription="This action will delete this path. Are you sure?"
        AlertTitle={`Delete path ${activePath?.title}`}
        onClickAction={handleDeletePath}
        open={!!currentView}
        onClose={closeModal}
        AlertActionVariant="destructive"
      />
    );
  }
};

export default LearningPathOperationsModal;
