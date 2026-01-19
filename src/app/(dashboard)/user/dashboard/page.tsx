import UserDashboard from "@/app/(dashboard)/user/dashboard/_components/user-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard | Mini Quiz",
  description: "User Dashboard!",
};

export default function DashboardPage() {
  return <UserDashboard />;
}
