import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RootProvider } from "@/components/layout/RootProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Deep Patel | Computer Engineering Student",
  description: "Personal engineering portfolio of Deep Patel, a Computer Engineering student at the University of Guelph specializing in embedded systems, RTOS, robotics, automation, and full-stack software development.",
  keywords: ["Deep Patel", "Computer Engineering", "Embedded Systems", "Software Engineer", "University of Guelph", "RTOS", "Robotics", "CAN Bus", "STM32", "FreeRTOS", "Next.js"],
  authors: [{ name: "Deep Patel" }],
  openGraph: {
    title: "Deep Patel | Computer Engineering Student",
    description: "Personal engineering portfolio of Deep Patel, a Computer Engineering student at the University of Guelph specializing in embedded systems, RTOS, robotics, and full-stack software development.",
    url: "https://deeppatel.dev",
    siteName: "Deep Patel Portfolio",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Deep Patel | Computer Engineering Student",
    description: "Personal engineering portfolio of Deep Patel, a Computer Engineering student at the University of Guelph."
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
