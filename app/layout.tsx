import type { Metadata } from "next";
import { Inter, Fira_Code, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const fira = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya Halder",
  description:
    "Aditya Halder is a mobile app developer building production Android and cross-platform apps with Flutter and Kotlin.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${fira.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
