"use client";

import { CalendarClock, PlusCircle } from "lucide-react";

import TasksGrid from "./TasksGrid";
import { useTaskStore } from "../store/useTaskStore";

const TasksView = () => {
  const openModal = useTaskStore((state) => state.openModal);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 p-4 md:p-8">
      <div
        className="flex items-center justify-center gap-1 py-10 rounded-xl bg-sky-500/90 hover:bg-sky-500 text-white/60 hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer"
        onClick={() => openModal(null, "create")}
      >
        <span>
          <PlusCircle className="size-5" />
        </span>
        <span>Create A Task</span>
      </div>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <CalendarClock className="size-5" />
          <h2 className="text-lg font-semibold">Task Board</h2>
        </div>

        <TasksGrid />
      </section>
    </main>
  );
};

export default TasksView;
