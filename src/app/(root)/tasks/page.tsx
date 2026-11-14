import { redirect } from "next/navigation";

export default function TaskManagementPage() {
  return redirect("/tasks/all/overview");
}
