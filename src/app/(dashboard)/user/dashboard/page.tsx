import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard | Mini Quiz",
  description: "User Dashboard!",
};

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Ini user dashboard</p>
    </div>
  );
}
