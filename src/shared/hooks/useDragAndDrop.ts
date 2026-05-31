import { useState, DragEvent } from "react";

type UseDragAndDropProps = {
  onDrop: (draggedId: string, toContainerId: string) => void;
};

export const useDragAndDrop = ({ onDrop }: UseDragAndDropProps) => {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const getDragProps = (itemId: string, containerId: string) => {
    return {
      draggable: true as const,
      onDragStart: (e: DragEvent) => {
        setDraggedId(itemId);
        e.dataTransfer.setData("draggedId", itemId);
        e.dataTransfer.effectAllowed = "move";
      },
      onDragEnd: () => {
        (setDraggedId(null), setOverId(null));
      },
    };
  };

  const getDropProps = (containerId: string) => {
    return {
      onDragOver: (e: DragEvent) => {
        e.preventDefault();
        setOverId(containerId);
      },
      onDragLeave: (e: DragEvent) => {
        const el = e.currentTarget as HTMLElement;
        if (!el.contains(e.relatedTarget as Node)) setOverId(null);
      },
      onDrop: (e: DragEvent) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("draggedId");
        if (id) onDrop(id, containerId);
        setOverId(null);
      },
    };
  };

  return {
    draggedId,
    overId,
    getDropProps,
    getDragProps,
  };
};
