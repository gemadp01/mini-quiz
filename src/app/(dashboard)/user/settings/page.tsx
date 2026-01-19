import Settings from "@/app/(dashboard)/user/settings/_components/settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Settings | Mini Quiz",
  description: "User Settings!",
};

export default function SettingsPage() {
  return <Settings />;
}
