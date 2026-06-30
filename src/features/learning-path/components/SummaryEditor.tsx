"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { type MDXEditorMethods } from "@mdxeditor/editor";
import AppEmpty from "@/shared/ui/AppEmpty";
import Spinner from "@/shared/ui/Spinner";

import { useUpdateLearningPathSummary } from "../hooks/useLearningPath";

const Editor = dynamic(() => import("@/shared/editor/Editor"), {
  ssr: false,
  loading: () => (
    <AppEmpty emptyClassName="border border-dashed">
      <Spinner />
    </AppEmpty>
  ),
});

interface SummaryEditorProps {
  learningPathId: string;
  initialSummary?: string;
}

const SummaryEditor = ({
  learningPathId,
  initialSummary = "",
}: SummaryEditorProps) => {
  const editorRef = useRef<MDXEditorMethods | null>(null);
  const lastSaved = useRef(initialSummary);

  const { mutate, isPending } = useUpdateLearningPathSummary(learningPathId);

  const handleBlur = () => {
    const current = editorRef.current?.getMarkdown() ?? "";

    if (current === lastSaved.current) return;
    lastSaved.current = current;
    mutate(current, {
      onError: () => {
        lastSaved.current = "";
      },
    });
  };

  return (
    <div onBlur={handleBlur}>
      <Editor
        editorRef={editorRef}
        markdown={initialSummary}
        placeholder="Enter summary for your learning path..."
      />
    </div>
  );
};

export default SummaryEditor;
