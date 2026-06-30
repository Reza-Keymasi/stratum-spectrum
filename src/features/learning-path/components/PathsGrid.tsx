import { WaypointsIcon } from "lucide-react";

import { useGetLearningPaths } from "../hooks/useLearningPath";
import PathCard from "./PathCard";
import AppEmpty from "@/shared/ui/AppEmpty";
import Spinner from "@/shared/ui/Spinner";

const PathsGrid = () => {
  const { data: learningPaths, isPending: isGetPathPending } =
    useGetLearningPaths();

  return (
    <>
      {isGetPathPending ? (
        <AppEmpty emptyClassName="border border-dashed">
          <Spinner />
          <span>Loading paths, please wait...</span>
        </AppEmpty>
      ) : !learningPaths?.length ? (
        <AppEmpty
          emptyTitle="No learning path yet"
          emptyDescription="Add your first track to map your growth plan."
          emptyClassName="border border-dashed"
          emptyMedia={<WaypointsIcon />}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {learningPaths?.map((path) => (
            <PathCard path={path} key={path._id} />
          ))}
        </div>
      )}
    </>
  );
};

export default PathsGrid;
