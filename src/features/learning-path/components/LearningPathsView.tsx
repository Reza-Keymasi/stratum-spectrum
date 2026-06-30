"use client";

import { CheckCircle2, PlusCircle } from "lucide-react";

import LearningPathOperationsModal from "./modals/LearningPathOperationsModal";
import { useLearningPathStore } from "../store/useLearningPathStore";
import PathsGrid from "./PathsGrid";

const LearningPathsView = () => {
  const openModal = useLearningPathStore((state) => state.openModal);

  // const updateLearningPath = useMutation({
  //   mutationFn: ({
  //     id,
  //     payload,
  //   }: {
  //     id: string;
  //     payload: Partial<LearningPath>;
  //   }) =>
  //     fetcher<LearningPath>(`/api/learning-paths/${id}`, {
  //       method: "PATCH",
  //       body: JSON.stringify(payload),
  //     }),
  //   onSuccess: () =>
  //     queryClient.invalidateQueries({ queryKey: ["learning-paths"] }),
  // });

  return (
    <main className="mx-auto flex h-[calc(100vh-126px)] w-full max-w-7xl flex-col gap-6 p-4 md:p-8">
      <div
        className="flex items-center justify-center gap-1 py-10 rounded-xl bg-sky-500/90 hover:bg-sky-500 text-white/60 hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer"
        onClick={() => openModal(null, "create-path")}
      >
        <span>
          <PlusCircle className="size-5" />
        </span>
        <span>Create Learning Path</span>
      </div>

      <LearningPathOperationsModal />

      <section>
        <div className="mb-3 flex items-center gap-2">
          <CheckCircle2 className="size-5" />
          <h2 className="text-lg font-semibold">Learning Paths</h2>
        </div>

        <PathsGrid />
      </section>
    </main>
  );
};

export default LearningPathsView;
