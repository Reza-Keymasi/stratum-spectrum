import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { subDays, format, addDays } from "date-fns";
import { TZDate } from "@date-fns/tz";

import { requireAuth } from "@/features/auth/lib/session";
import { getToday } from "@/lib/today";
import { Task } from "@/shared/lib/models/task.model";
import connectToDB from "@/app/lib/db/connectToDB";
import { parseScope } from "@/features/task-management/lib/url";
import { scopeMatch } from "@/features/task-management/lib/scopeMatch";

export async function GET(req: NextRequest) {
  const { userId } = await requireAuth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const scope = parseScope(req.nextUrl.searchParams.get("scope"));

  const today = await getToday();

  if (!scope)
    return NextResponse.json({ message: "Invalid scope" }, { status: 400 });
  if (scope.kind !== "smart" && !Types.ObjectId.isValid(scope.id)) {
    return NextResponse.json({ message: "Invelid Project" }, { status: 400 });
  }

  const rangeStart = subDays(new TZDate(today.start.getTime(), today.tz), 6);
  const rangeStartDate = new Date(rangeStart.getTime());

  const match = scopeMatch(scope, userId, today);

  const notDone = { status: { $ne: "done" } };

  try {
    await connectToDB();

    const [response] = await Task.aggregate([
      { $match: match },
      {
        $facet: {
          totals: [{ $group: { _id: "$status", n: { $sum: 1 } } }],

          overdue: [
            { $match: { ...notDone, dueDate: { $lt: today.start } } },
            { $count: "n" },
          ],

          dueToday: [
            {
              $match: {
                ...notDone,
                dueDate: { $gte: today.start, $lte: today.end },
              },
            },
            { $count: "n" },
          ],

          plannedToday: [
            {
              $match: {
                ...notDone,
                dueDate: { $gte: today.start, $lt: today.end },
              },
            },
            {
              $group: {
                _id: null,
                minutes: { $sum: { $ifNull: ["$estimateMinutes", 0] } },
              },
            },
          ],

          byPriority: [
            { $match: notDone },
            { $group: { _id: "$priority", n: { $sum: 1 } } },
          ],

          perProject: [
            {
              $group: {
                _id: "$project",
                total: { $sum: 1 },
                done: {
                  $sum: { $cond: [{ $eq: ["$status", "done"] }, 1, 0] },
                },
              },
            },
          ],

          last7Days: [
            {
              $match: { status: "done", completedAt: { $gte: rangeStartDate } },
            },
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$completedAt",
                    timezone: today.tz,
                  },
                },
                n: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);

    const count = (arr: { n: number }[]) => arr[0]?.n ?? 0;
    const byStatus = Object.fromEntries(
      response.totals.map((t: any) => [t._id, t.n]),
    ) as Record<string, number>;

    const doneByDay = new Map<string, number>(
      response.last7Days.map((d: any) => [d._id, d.n]),
    );

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = addDays(rangeStart, i);
      const date = format(d, "yyyy-MM-dd");
      return { date, count: doneByDay.get(date) ?? 0 };
    });

    const priority = Object.fromEntries(
      response.byPriority.map((p: any) => [p._id, p.n]),
    ) as Record<string, number>;

    const data = {
      open: (byStatus.todo ?? 0) + (byStatus.in_progress ?? 0),
      todo: byStatus.todo ?? 0,
      inProgress: byStatus.in_progress ?? 0,
      done: byStatus.done ?? 0,
      overdue: count(response.overdue),
      dueToday: count(response.dueToday),
      doneThisWeek: last7Days.reduce((s, d) => s + d.count, 0),
      byPriority: {
        high: priority.high ?? 0,
        medium: priority.medium ?? 0,
        low: priority.low ?? 0,
      },
      perProject: response.perProject
        .filter((p: any) => p._id)
        .map((p: any) => ({
          projectId: String(p._id),
          total: p.total,
          done: p.done,
          progress: p.total ? Math.round((p.done / p.total) * 100) : 0,
        })),
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}
