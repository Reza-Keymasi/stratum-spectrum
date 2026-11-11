import { z } from "zod";

export const VIEWS = ["overview", "list", "board"] as const;
export const SMART = [
  "all",
  "today",
  "upcoming",
  "overdue",
  "starred",
  "done",
] as const;

export type Scope =
  | { kind: "smart"; id: (typeof SMART)[number] }
  | { kind: "project"; id: string }
  | { kind: "label"; id: string };

export type View = (typeof VIEWS)[number];

export const scopeHref = (scope: Scope, view = "list") =>
  scope.kind === "smart"
    ? `/tasks/${scope.id}/${view}`
    : `/tasks/${scope.kind}/${scope.id}/${view}`;

export const Filters = z.object({
  query: z.string().trim().max(100).optional(),
  priority: z
    .enum(["low", "medium", "high", "urgent"])
    .optional()
    .catch(undefined),
  sort: z
    .enum(["due", "priority", "created", "title"])
    .default("due")
    .catch("due"),
  group: z
    .enum(["due", "project", "priority", "status", "none"])
    .default("due")
    .catch("due"),
  done: z.enum(["1"]).optional().catch(undefined),
  month: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .optional()
    .catch(undefined),
  task: z.string().optional(),
});
export type Filters = z.infer<typeof Filters>;
