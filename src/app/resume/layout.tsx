import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Deep Patel",
  description: "Read or download Deep Patel's professional engineering resume, covering academic achievements at University of Guelph, embedded systems experience, and full-stack development skills.",
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
