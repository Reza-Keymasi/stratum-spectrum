import HabitDetailsView from "@/features/habits/components/HabitDetailsView";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const HabitPage = async ({ params }: Props) => {
  const { id } = await params;
  return <HabitDetailsView id={id} />;
};

export default HabitPage;
