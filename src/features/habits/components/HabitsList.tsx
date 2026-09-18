"use client";

import AppEmpty from "@/shared/ui/AppEmpty";
import { useGetHabits } from "../hooks/useHabitQueries";
import HabitRow from "./HabitRow";
import HabitsListSkeleton from "./HabitsListSkeleton";

const today = new Date();

const formattedDate = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
})
  .format(today)
  .replace(",", "");

const HabitsList = () => {
  const { data: habits = [], isPending: isPendingHabits } = useGetHabits();

  const positiveHabits = habits.filter((habit) => habit.isNegative === false);
  const negativeHabits = habits.filter((habit) => habit.isNegative === true);

  if (isPendingHabits) return <HabitsListSkeleton />;

  return (
    <div className="flex flex-col gap-10 my-3">
      <div className=" px-20 flex justify-between items-center">
        <div className="flex flex-col gap-1 text-start">
          <span className="text-xs text-gray-400 font-mono uppercase">
            habit tracker
          </span>
          <span className="text-3xl font-semibold text-gray-700 capitalize">
            your habits
          </span>
        </div>

        <p className="font-mono">{formattedDate}</p>
      </div>

      <div className="w-full border h-px" />

      <div>
        <div className="max-w-5xl mx-auto flex flex-col mt-2 mb-8">
          <div className="flex items-center gap-2 w-full py-3 text-sm text-gray-400 font-mono">
            <span>Build</span>
            <div className="w-full h-px border" />
            <span>{positiveHabits?.length}</span>
          </div>
          <div>
            {positiveHabits?.length > 0 ? (
              positiveHabits?.map((habit) => (
                <HabitRow habit={habit} key={habit._id} />
              ))
            ) : (
              <AppEmpty
                emptyTitle="You have no positive habit to track."
                emptyClassName="border border-dashed"
              />
            )}
          </div>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col">
          <div className="flex items-center gap-2 w-full py-3 text-sm text-gray-400 font-mono">
            <span>Break</span>
            <div className="w-full h-px border" />
            <span>{negativeHabits?.length}</span>
          </div>
          <div>
            {negativeHabits?.length > 0 ? (
              negativeHabits?.map((habit) => (
                <HabitRow habit={habit} key={habit._id} />
              ))
            ) : (
              <AppEmpty
                emptyTitle="You have no negative habit to track."
                emptyClassName="border border-dashed"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitsList;
