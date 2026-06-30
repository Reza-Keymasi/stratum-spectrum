import { create } from "zustand";
import { LearningPath } from "../types/path.schema";

type PathView = "create-path" | "delete" | null;

interface UseLearningPathStore {
  currentView: PathView;
  activePath: LearningPath | null;
  openModal: (path: LearningPath | null, view: PathView) => void;
  closeModal: () => void;
}

export const useLearningPathStore = create<UseLearningPathStore>((set) => ({
  currentView: null,
  activePath: null,
  openModal: (path, view) => set({ activePath: path, currentView: view }),
  closeModal: () => set({ activePath: null, currentView: null }),
}));
