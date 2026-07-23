import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience | Deep Patel",
  description: "Review Deep Patel's work history, including technical operations support, fire protection systems diagnostics, and volunteer STEM instruction.",
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
