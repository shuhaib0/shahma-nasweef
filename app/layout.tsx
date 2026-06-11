import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mufeed & Fahiza",
  description: "Wedding reception invitation for Mufeed and Fahiza",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
