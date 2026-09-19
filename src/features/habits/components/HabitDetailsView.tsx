"use client";
import {
  useAddNewWeek,
  useGetHabit,
  useGetHabitEntry,
  useToggleHabitCompletion,
  useUpdateHabitEntry,
} from "../hooks/useHabitQueries";
import HabitDetailsSkeleton from "./HabitDetailsSkeleton";
import HabitDaysOfWeekGrid from "./HabitDaysOfWeekGrid";
import HabitShortStats from "./HabitShortStats";
import HabitProgress from "./HabitProgress";
import HabitHeader from "./HabitHeader";

const HabitDetailsView = ({ id }: { id: string }) => {
  const { data: habit } = useGetHabit(id);
  const isNegative = habit?.isNegative;
  const { data: entries, isPending: isPendeingHabitEntry } =
    useGetHabitEntry(id);
  const { mutate: updateDay } = useUpdateHabitEntry();

  const { mutate: addNewWeek } = useAddNewWeek(id);

  const { mutate: habitCompletion } = useToggleHabitCompletion(id);

  if (isPendeingHabitEntry) return <HabitDetailsSkeleton />;

  const handleClickOnDay = (dayIndex: number, weekNumber: number) => {
    const entry = entries?.find((entry) =>
      entry.days.some((day) => day.index === dayIndex),
    );

    if (!entry) return;

    const day = entry.days.find((day) => day.index === dayIndex);

    if (!day?.active && entry.weekNumber === weekNumber) return;

    updateDay({
      id,
      weekNumber: String(weekNumber),
      input: {
        dayIndex,
      },
    });
  };
  const handleHabitCompletion = () => {
    habitCompletion({
      completed: habit?.completed ? false : true,
    });
  };

  const targetValue = habit?.targetValue as number;

  const doneDays = entries?.flatMap((entry) =>
    entry.days.filter((day) => day.done === true),
  )?.length as number;
  const activeDaysCount = entries?.flatMap((entry) =>
    entry.days.filter((day) => day.active),
  )?.length as number;

  const completionRate = Math.floor((doneDays / activeDaysCount) * 100);

  const totalTargetValue = activeDaysCount * targetValue;
  const trackedValue = doneDays * targetValue;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Top */}
      <HabitHeader
        title={habit?.title}
        description={habit?.description}
        categories={habit?.categories}
        isNegative={habit?.isNegative}
      />

      {/* Short Stats */}
      <HabitShortStats
        activeDaysCount={activeDaysCount}
        completionRate={completionRate}
        weeksCount={entries?.length}
        goalType={habit?.goalType}
      />

      {/* Days Of Weeks */}
      <HabitDaysOfWeekGrid
        entries={entries}
        onAddWeek={() => addNewWeek()}
        onDayClick={handleClickOnDay}
      />

      {/* Total Progress Starts Here */}

      <HabitProgress
        completed={habit?.completed}
        completionRate={completionRate}
        goalType={habit?.goalType}
        unit={habit?.unit as string}
        targetValue={targetValue}
        weeksCount={entries?.length as number}
        trackedValue={trackedValue}
        totalTargetValue={totalTargetValue}
        onToggleCompletion={handleHabitCompletion}
      />

      {/* Total progress Ends Here */}
    </div>
  );
};

export default HabitDetailsView;
