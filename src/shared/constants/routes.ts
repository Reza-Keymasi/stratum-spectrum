export const ROUTES = {
  HOME: "/",
  DICTIONARY: "/language/dictionary",
  LEITNER: "/language/leitner",
  TASKS: "/tasks",
  LEARNING_PATHS: "/learning-paths",
  LEARNING_PATH: (id: string) => `/learning-paths/${id}`,
  HABITS_NEW: "/habits/new",
  HABITS_LIST: "/habits/list",
};
