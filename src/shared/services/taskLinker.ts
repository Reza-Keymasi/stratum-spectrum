// import mongoose from "mongoose";
import Task from "../lib/models/task.model";
import { Task as TaskType } from "@/features/task-management/types/task.schema";
import LearningPath from "../lib/models/learning-path.model";

export async function attachTaskToLearningPath(
  taskId: string,
  learningPathId: string,
): Promise<TaskType> {
  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { learningPath: learningPathId },
      // { new: true, session },
    );

    if (!updatedTask) throw Error("Learning path not found");

    await LearningPath.findByIdAndUpdate(
      learningPathId,
      { $addToSet: { tasks: taskId } },
      // { session },
    );

    // await session.commitTransaction();
    return updatedTask as unknown as TaskType;
  } catch (error) {
    // await session.abortTransaction();
    throw error;
  }
  // finally {
  //   session.endSession();
  // }
}
