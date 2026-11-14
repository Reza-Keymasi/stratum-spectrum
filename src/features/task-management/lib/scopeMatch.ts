import { Types } from "mongoose";

import { Scope } from "./url";
import { Today } from "@/lib/today";

const smartMatchStrategies: Record<
  string,
  (
    base: Record<string, unknown>,
    today: Today,
    notDone: Record<string, unknown>,
  ) => Record<string, unknown>
> = {
  today: (base, today) => ({
    ...base,
    dueDate: { $gte: today.start, $lt: today.end },
  }),
  overdue: (base, today, notDone) => ({
    ...base,
    ...notDone,
    dueDate: { $lt: today.start },
  }),
  upcoming: (base, today, notDone) => ({
    ...base,
    ...notDone,
    dueDate: { $gte: today.end },
  }),
  starred: (base) => ({ ...base, starred: true }),
  completed: (base) => ({ ...base, status: "done" }),
};

const kindMatchStrategies = {
  project: (
    base: Record<string, unknown>,
    scope: Extract<Scope, { kind: "project" }>,
  ) => ({
    ...base,
    project: new Types.ObjectId(scope.id),
  }),
  label: (
    base: Record<string, unknown>,
    scope: Extract<Scope, { kind: "label" }>,
  ) => ({
    ...base,
    labels: new Types.ObjectId(scope.id),
  }),
  smart: (
    base: Record<string, unknown>,
    scope: Extract<Scope, { kind: "smart" }>,
    today: Today,
    notDone: Record<string, unknown>,
  ) => {
    const strategy = smartMatchStrategies[scope.slug];
    return strategy ? strategy(base, today, notDone) : base;
  },
};

export const scopeMatch = (scope: Scope, userId: string, today: Today) => {
  const base: Record<string, unknown> = { userId: new Types.ObjectId(userId) };
  const notDone = { status: { $ne: "done" } };

  const handler =
    kindMatchStrategies[scope.kind as keyof typeof kindMatchStrategies];

  return handler ? (handler as any)(base, scope, today, notDone) : base;
};
