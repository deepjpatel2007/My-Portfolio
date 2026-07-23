import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills | Deep Patel",
  description: "View Deep Patel's technical capabilities, structured across programming languages, embedded systems, software engineering patterns, CAD, and automation.",
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
