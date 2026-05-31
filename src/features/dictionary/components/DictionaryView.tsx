import React from "react";
import AddWordForm from "./AddWordForm";
import WordsGrid from "./WordsGrid";

const DictionaryView = () => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 p-4 md:p-8">
      <div className="flex gap-4">
        <AddWordForm />
      </div>

      <WordsGrid />
    </main>
  );
};

export default DictionaryView;
