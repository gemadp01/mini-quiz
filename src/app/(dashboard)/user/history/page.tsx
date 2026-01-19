import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User History | Mini Quiz",
  description: "User History!",
};

export default function DashboardPage() {
  return (
    <div>
      <h1>History</h1>
      <p>Ini user history</p>
    </div>
  );
}
