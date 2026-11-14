import { notFound } from "next/navigation";

import TaskScreen from "@/features/task-management/components/TaskScreen";
import { SMART, VIEWS, Filters } from "@/features/task-management";

interface Props {
  params: Promise<{ scope: string; view: string }>;
  searchParams: Promise<Record<string, string[] | string>>;
}

export default async function Page({ params, searchParams }: Props) {
  const { scope, view } = await params;

  const sp = await searchParams;

  if (!SMART.includes(scope as any) || !VIEWS.includes(view as any)) notFound();

  return (
    <TaskScreen
      scope={{ kind: "smart", slug: scope as any }}
      view={view as any}
    />
  );
}
