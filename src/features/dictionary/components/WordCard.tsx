import { PenIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Word } from "../types/word.schema";
import EnrichWordModal from "./modals/EnrichWordModal";

interface WordCardProps {
  word: Word;
  onDelete: () => void;
  isDeleting: boolean;
}

const WordCard = ({ word, onDelete, isDeleting }: WordCardProps) => {
  return (
    <div className="flex flex-col border border-sky-200 hover:shadow-2xs hover:scale-105 transition-all duration-300 rounded-md px-3 py-2">
      <div className="flex flex-col flex-wrap gap-2">
        <p className="flex gap-2">
          <span className="font-semibold text-lg text-sky-700">
            {word.title}
          </span>
          {word.wordClass ? (
            <Badge className="bg-sky-50 text-sky-700 py-0.5">
              {word.wordClass}
            </Badge>
          ) : (
            <Badge variant="outline">No Class</Badge>
          )}
        </p>

        <EnrichWordModal word={word} />
      </div>

      <div className="flex items-end justify-between gap-2">
        <span className="font-semibold text-sm text-sky-700">
          {word.meaning}
        </span>

        <div>
          <Button
            size="icon"
            className="size-7"
            variant="ghost"
            onClick={onDelete}
            disabled={isDeleting}
          >
            <Trash2Icon size={16} strokeWidth={1.5} color="red" />
          </Button>
          <Button size="icon" className="size-7" variant="ghost">
            <PenIcon size={16} strokeWidth={1.5} className="text-sky-400" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
