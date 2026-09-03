import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shahma & Nasweef | Wedding Reception",
  description: "You are cordially invited to the wedding reception of Shahma Sherin & Nasweef on 27 September 2026 at Purayil (H) Earpona, Thamarassery.",
  openGraph: {
    title: "Shahma Sherin & Nasweef 💍",
    description: "Join us to celebrate our wedding reception on 27 September 2026 · 12 PM · Purayil (H) Earpona, Thamarassery",
    type: "website",
    locale: "en_IN",
    siteName: "Shahma & Nasweef Wedding",
    images: [
      {
        url: "/assets/bismillah-real-gold-seal.png",
        width: 800,
        height: 800,
        alt: "Shahma & Nasweef Wedding Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shahma Sherin & Nasweef 💍",
    description: "Join us to celebrate our wedding reception on 27 September 2026 · 12 PM · Purayil (H) Earpona, Thamarassery",
    images: ["/assets/bismillah-real-gold-seal.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
