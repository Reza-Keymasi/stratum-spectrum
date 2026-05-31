import { useState } from "react";
import { CircleCheckBig, PlusCircle } from "lucide-react";

import AppInput from "@/shared/ui/AppInput";
import { useUpdateTask } from "../hooks/useTaskManagementQueries";
import { Task } from "../types/task.schema";
import { Button } from "@/components/ui/button";

const AddStepToTask = ({ selectedTask }: { selectedTask: Task }) => {
  const [showTaskStepInput, setShowTaskStepInput] = useState(false);
  const [taskStepText, setTaskStepText] = useState("");

  const { mutate, isPending } = useUpdateTask();

  const handleAddStep = (id: string, step: string) => {
    mutate({
      id,
      payload: {
        steps: [
          ...(selectedTask.steps ?? []),
          { text: step.trim(), done: false },
        ],
      },
    });
  };

  const handleUpdateStep = (id: string, index: number) => {
    const updatingSteps = selectedTask.steps.map((step, stepIndex) =>
      stepIndex === index ? { ...step, done: !step.done } : step,
    );
    mutate({
      id,
      payload: {
        steps: updatingSteps,
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-1 text-muted-foreground text-sm">
        <span>
          Due date:{" "}
          {selectedTask.dueDate
            ? new Date(selectedTask.dueDate).toLocaleDateString()
            : "No due date"}
        </span>

        <span className="capitalize">
          <i className="text-gray-500">{selectedTask?.category}</i> task
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Steps</h3>
          <Button
            variant="outline"
            onClick={() => setShowTaskStepInput((prev) => !prev)}
          >
            <PlusCircle /> Add Step
          </Button>
        </div>

        {showTaskStepInput ? (
          <div className="flex w-full gap-2">
            <AppInput
              name="step"
              placeholder="Enter Step"
              value={taskStepText}
              onChange={(e) => setTaskStepText(e.target.value)}
            />

            <Button
              onClick={() => handleAddStep(selectedTask._id, taskStepText)}
              disabled={isPending || !taskStepText.trim()}
              className="bg-sky-500 hover:bg-sky-600"
            >
              Save
            </Button>
          </div>
        ) : null}

        {selectedTask.steps?.length > 0 ? (
          <ul className="space-y-2">
            {selectedTask.steps?.map((step, index) => (
              <li key={`${step.text} - ${index}`}>
                <Button
                  type="button"
                  variant="outline"
                  className="hover:bg-muted  w-full flex justify-start items-center gap-2 rounded-md border p-2 text-justify"
                  onClick={() => handleUpdateStep(selectedTask._id, index)}
                >
                  <CircleCheckBig
                    className={`size-4 ${step.done ? "text-green-600" : "text-muted-foreground"}`}
                  />
                  <span
                    className={
                      step.done ? "text-muted-foreground line-through" : ""
                    }
                  >
                    {step.text}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">
            No steps yet. Add a step with the + button
          </p>
        )}
      </div>
    </>
  );
};

export default AddStepToTask;
