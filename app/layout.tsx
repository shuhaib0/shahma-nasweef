import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shahma & Nasweef",
  description: "Wedding reception invitation for Shahma Sherin and Nasweef",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
