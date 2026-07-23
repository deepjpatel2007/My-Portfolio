import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Deep Patel",
  description: "Learn about Deep Patel's academic background in Computer Engineering at the University of Guelph, interest in hardware-software integration, and engineering pursuits.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
