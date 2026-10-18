"use client";

import { Button } from "@/components/ui/button";
import { useTransactionFormPanelStore } from "../store/useTransactionFormPanelStore";

const TransactionToggleButton = () => {
  const isOpen = useTransactionFormPanelStore((s) => s.isOpen);
  const toggle = useTransactionFormPanelStore((s) => s.toggle);
  return (
    <Button
      className="bg-green-500 hover:bg-green-600 cursor-pointer font-medium"
      onClick={toggle}
      aria-expanded={isOpen}
    >
      {isOpen ? "Cancel" : "+ Transaction"}
    </Button>
  );
};

export default TransactionToggleButton;
