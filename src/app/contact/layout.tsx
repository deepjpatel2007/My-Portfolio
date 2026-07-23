import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Deep Patel",
  description: "Get in touch with Deep Patel. Schedule an interview, collaborate on a project, or contact via email and social channels.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
