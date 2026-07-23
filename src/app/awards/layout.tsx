import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Awards | Deep Patel",
  description: "Academic honors, competition first-place rankings, and professional credentials awarded to Computer Engineering student Deep Patel.",
};

export default function AwardsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
