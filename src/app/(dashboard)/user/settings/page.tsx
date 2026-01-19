import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Settings | Mini Quiz",
  description: "User Settings!",
};

export default function SettingsPage() {
  return (
    <div>
      <h1>User Settings</h1>
      <p>Ini user settings</p>
    </div>
  );
}
