import { create } from "zustand";
import { Task } from "../types/task.schema";

type TaskView = "create" | "edit" | "delete" | "add_step" | null;

interface TaskState {
  activeTask: Task | null;
  currentView: TaskView;
  openModal: (task: Task | null, view: TaskView) => void;
  closeModal: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  activeTask: null,
  currentView: null,
  openModal: (task, view) => set({ activeTask: task, currentView: view }),
  closeModal: () => set({ activeTask: null, currentView: null }),
}));
