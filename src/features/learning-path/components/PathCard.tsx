import Link from "next/link";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import AppCard from "@/shared/ui/AppCard";
import { LearningPath } from "../types/path.schema";
import { useLearningPathStore } from "../store/useLearningPathStore";

interface PathCardProps {
  path: LearningPath;
}

const PathCard = ({ path }: PathCardProps) => {
  const openModal = useLearningPathStore((state) => state.openModal);
  return (
    <AppCard
      key={path._id}
      cardTitle={
        <Link
          href={`/learning-paths/${path._id}`}
          className="bg-sky-200/30 hover:bg-accent text-sky-800 inline-flex rounded-md px-3 py-1 text-sm font-semibold transition"
        >
          {path.title}
        </Link>
      }
      cardDescription={path.topic}
      cardClassName="shadow-none py-0 pt-6 pb-2"
    >
      <div className="mb-1 flex items-center justify-between text-sm">
        <span>Progress</span>
        <span>{path.progress}%</span>
      </div>
      <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
        <div
          className="bg-primary h-full transition-all"
          style={{
            width: `${Math.min(100, Math.max(0, path.progress))}%`,
          }}
        />
      </div>

      {/* <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      updateLearningPath.mutate({
                        id: path._id,
                        payload: {
                          progress: Math.min(100, path.progress + 10),
                        },
                      })
                    }
                  >
                    +10%
                  </Button> */}
      {/* <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      updateLearningPath.mutate({
                        id: path._id,
                        payload: {
                          progress: Math.max(0, path.progress - 10),
                        },
                      })
                    }
                  >
                    -10%
                  </Button> */}
      <div className="flex justify-end pt-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => openModal(path, "delete")}
        >
          <Trash2 className="text-red-500" />
        </Button>
      </div>
    </AppCard>
  );
};

export default PathCard;
