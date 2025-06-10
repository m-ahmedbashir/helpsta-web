import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Helpsta - Coming Soon",
  description:
    "Helpsta - The revolutionary mobile application coming soon. A platform that connects people and provides instant help.",
  keywords: "Helpsta, mobile app, coming soon, help platform, assistance app",
  authors: [{ name: "Helpsta Team" }],
  openGraph: {
    title: "Helpsta - Coming Soon",
    description: "The revolutionary mobile application coming soon",
    type: "website",
    locale: "en_US",
    alternateLocale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helpsta - Coming Soon",
    description: "The revolutionary mobile application coming soon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
