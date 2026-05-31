"use client";

import { useState } from "react";

import { useDeleteWord, useGetWords } from "../hooks/useDictionaryQueries";
import WordCard from "./WordCard";

export default function WordsGrid() {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { data, error, isPending: isGetWordsPending } = useGetWords();
  const { mutate: deleteWord } = useDeleteWord();

  if (isGetWordsPending)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading Words...
      </div>
    );

  if (error) return <div>An error occured{error.message}</div>;

  const handleDeleteWord = (id: string) => {
    setDeletingId(id);
    deleteWord(id, {
      onSettled: () => setDeletingId(null),
    });
  };

  // const handleUpdateWord =

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-8xl flex-col gap-6">
      <div className="flex flex-col gap-5">
        <span className="w-fit font-bold text-3xl text-sky-700 bg-sky-200 py-2 px-3 rounded-md">
          Your Words Library
        </span>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((word) => (
            <WordCard
              key={word._id}
              word={word}
              onDelete={() => handleDeleteWord(word._id)}
              isDeleting={deletingId === word._id}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
