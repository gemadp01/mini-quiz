import { DarkModeToggle } from "@/components/common/darkmode-toggle";

export default function Home() {
  return (
    <>
      <div className="relative bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="absolute top-4 right-4">
          <DarkModeToggle />
        </div>
      </div>
    </>
  );
}
