import { TaskPriority, TaskStatus } from "../types/task.schema";

export const TaskStatusMap: Record<
  TaskStatus,
  { status: string; statusStyle: string; currentTaskActiveStatusStyles: string }
> = {
  todo: {
    status: "Todo",
    statusStyle: "bg-gray-500",
    currentTaskActiveStatusStyles: "bg-gray-100 border-gray-500",
  },
  in_progress: {
    status: "In Progress",
    statusStyle: "bg-orange-500",
    currentTaskActiveStatusStyles: "bg-orange-100 border-orange-500",
  },
  review: {
    status: "In review",
    statusStyle: "bg-blue-500",
    currentTaskActiveStatusStyles: "bg-blue-100 border-blue-500",
  },
  done: {
    status: "Done",
    statusStyle: "bg-red-500",
    currentTaskActiveStatusStyles: "bg-red-100 border-red-500",
  },
};

export const TaskPrioritiesMap: Record<
  TaskPriority,
  {
    priority: string;
    priorityStyle: string;
    currentTaskActivePriorityStyles: string;
  }
> = {
  low: {
    priority: "Low",
    priorityStyle: "text-gray-500",
    currentTaskActivePriorityStyles: "bg-gray-100 border-gray-500",
  },
  medium: {
    priority: "Medium",
    priorityStyle: "text-green-accent-500",
    currentTaskActivePriorityStyles: "bg-green-100 border-green-accent-500",
  },
  high: {
    priority: "High",
    priorityStyle: "text-orange-500",
    currentTaskActivePriorityStyles: "bg-orange-100 border-orange-500",
  },
};

export const PROJECTS = [
  "Inbox",
  "Product",
  "Engineering",
  "Design",
  "Marketing",
  "Personal",
];
