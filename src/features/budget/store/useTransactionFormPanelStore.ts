import { create } from "zustand";

interface TransactionFormPanelState {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export const useTransactionFormPanelStore = create<TransactionFormPanelState>(
  (set) => ({
    isOpen: false,
    toggle: () => set((current) => ({ isOpen: !current.isOpen })),
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  }),
);
