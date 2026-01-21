import UserDashboard from "@/app/(dashboard)/user/dashboard/_components/user-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard | Mini Quiz",
  description: "User Dashboard!",
};

export default function DashboardPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
      </div>
      <div className="mb-5">
        <p>Select a module to begin your assesment.</p>
      </div>

      <UserDashboard />
    </div>
  );
}
