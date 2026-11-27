import {
  Bot,
  Code2,
  Cog,
  GraduationCap,
  Hammer,
  Trophy,
  Users,
  Wrench,
  type LucideProps,
} from "lucide-react";
import type { ProjectTag } from "@/lib/projects";

export function TagIcon({ tag, ...props }: { tag: ProjectTag } & LucideProps) {
  const Icon = { Competition: Trophy, Team: Users, Club: Wrench, Software: Code2, Course: GraduationCap }[tag];
  return <Icon aria-hidden="true" {...props} />;
}

export function SkillIcon({ kind, ...props }: { kind: "cad" | "mfg" | "code" } & LucideProps) {
  const Icon = { cad: Cog, mfg: Hammer, code: Code2 }[kind];
  return <Icon aria-hidden="true" {...props} />;
}

export function TimelineIcon({ kind, ...props }: { kind: "education" | "project" } & LucideProps) {
  const Icon = kind === "education" ? GraduationCap : Bot;
  return <Icon aria-hidden="true" {...props} />;
}

// Maize-on-blue "M" monogram tile in U-M colors. Not the official Block M mark.
export function MichiganBadge({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#00274c" />
      <text
        x="16"
        y="22.5"
        textAnchor="middle"
        fontFamily="var(--font-head), sans-serif"
        fontWeight="800"
        fontSize="18"
        fill="#ffcb05"
      >
        M
      </text>
    </svg>
  );
}
