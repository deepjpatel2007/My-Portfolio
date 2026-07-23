import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Deep Patel",
  description: "Explore engineering projects built by Deep Patel, ranging from autonomous robotic vehicles and assistive mobility devices to full-stack web applications.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
