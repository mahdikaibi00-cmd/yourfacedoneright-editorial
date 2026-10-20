import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourfacedoneright.com"),
  title: "AZ Studio of Electrolysis & Permanent Makeup | Scottsdale, AZ | Your Face Done Right",
  description: "Scottsdale's premier cosmetic tattooing & permanent hair removal atelier led by Karyn Smith with over 20+ years of mastery. Specializing in bespoke Microblading, Nano Brows, Velvet Lip Blush, Permanent Eyeliner, and Medical Electrolysis.",
  keywords: [
    "Permanent Makeup Scottsdale AZ",
    "Microblading Scottsdale",
    "Electrolysis Scottsdale",
    "Permanent Hair Removal Scottsdale",
    "Lip Blush Phoenix",
    "Karyn Smith PMU",
    "Your Face Done Right",
    "Permanent Makeup Correction Scottsdale"
  ],
  openGraph: {
    title: "AZ Studio of Electrolysis & Permanent Makeup | Scottsdale, AZ",
    description: "20+ years of clinical skincare & cosmetic tattooing mastery by Karyn Smith in Scottsdale, Arizona.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
};

export const viewport = {
  themeColor: "#0C0908",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${jakarta.variable} scroll-smooth bg-[#0C0908]`}>
      <body className="min-h-screen bg-[#0C0908] text-[#1A1514] font-sans antialiased selection:bg-[#EBDCD5] selection:text-[#1A1514]">
        {children}
      </body>
    </html>
  );
}
