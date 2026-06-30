"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Waypoints } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CreateAndEditTaskForm,
  TaskOperationsModal,
} from "@/features/task-management";
import AppCard from "@/shared/ui/AppCard";
import { useGetLearningPath } from "@/features/learning-path/hooks/useLearningPath";
import { useGetTasksByLearningPathId } from "@/features/task-management/hooks/useTaskManagementQueries";
import PathTasksTimeLine from "@/features/learning-path/components/PathTasksTimeLine";
import SummaryEditor from "./SummaryEditor";
import AppEmpty from "@/shared/ui/AppEmpty";
import Spinner from "@/shared/ui/Spinner";

const LearningPathDetailsView = () => {
  const params = useParams();

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const { data: learningPathData, isPending } = useGetLearningPath(
    params?.id as string,
  );

  const { data: tasks } = useGetTasksByLearningPathId(params?.id as string);

  const completion = useMemo(() => {
    const allTasks = tasks ?? [];
    if (!allTasks.length) return 0;
    const doneCount = allTasks.filter((task) => task.status === "done").length;
    return Math.round((doneCount / allTasks.length) * 100);
  }, [tasks]);

  const selectedTask = useMemo(
    () => tasks?.find((task) => task._id === selectedTaskId) ?? null,
    [tasks, selectedTaskId],
  );

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-124px)]">
        <AppEmpty
          emptyClassName="border border-dashed"
          emptyHeaderClassName="hidden"
        >
          <Spinner />
          <span>Loading path details...</span>
        </AppEmpty>
      </div>
    );
  }

  if (!learningPathData) {
    return <main className="mx-auto max-w-5xl p-6">Path not found.</main>;
  }
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="outline" size="sm">
          <Link href="/">
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </Button>
        <p className="text-muted-foreground text-sm">{completion}% completed</p>
      </div>

      <div className="flex justify-between gap-4">
        <AppCard
          cardTitle={learningPathData?.title}
          cardDescription={learningPathData?.topic}
          cardClassName="w-2/5 h-fit shadow-none"
        >
          <div className="flex flex-col">
            <span className="capitalize">
              <i>deadline:</i>{" "}
              {learningPathData?.targetDate
                ? new Date(learningPathData?.targetDate).toLocaleDateString()
                : "Nothing"}
            </span>
            <span className="capitalize">
              {" "}
              <i>difficulty:</i> {learningPathData?.difficulty}
            </span>
          </div>
        </AppCard>
        <AppCard
          cardTitle="Add task to your path"
          cardClassName="w-3/5 shadow-none"
        >
          <CreateAndEditTaskForm learningPathId={params?.id as string} />
        </AppCard>
      </div>

      <PathTasksTimeLine tasks={tasks!} />

      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold">Write A Summary To Your Path</h3>
        <SummaryEditor
          learningPathId={String(params.id)}
          initialSummary={learningPathData?.summary}
        />
      </div>

      <TaskOperationsModal learningPathId={learningPathData._id} />
    </main>
  );
};

export default LearningPathDetailsView;
