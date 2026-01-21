import { BookOpen, Brain, GraduationCap, Lightbulb } from "lucide-react";

export const SUBTEST_ICON_MAP = {
  penalaran: [
    {
      title: "Penalaran",
      icon: Brain,
      className: "text-blue-500",
    },
  ],
  literasi: [
    {
      title: "Literasi",
      icon: BookOpen,
      className: "text-green-500",
    },
  ],
  pemahaman: [
    {
      title: "Pemahaman",
      icon: Lightbulb,
      className: "text-yellow-500",
    },
  ],
  pengetahuan: [
    {
      title: "Pengetahuan",
      icon: GraduationCap,
      className: "text-purple-500",
    },
  ],
};

export type subtestsIconKey = keyof typeof SUBTEST_ICON_MAP;
