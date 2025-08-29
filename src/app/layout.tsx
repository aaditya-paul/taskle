import type {Metadata} from "next";
import {Geist, Geist_Mono, Patrick_Hand} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-patrick-hand",
  subsets: ["latin"],
  weight: "400",
});

// Local font configuration
const virgilFont = localFont({
  src: [
    {
      path: "../../public/assets/fonts/Virgil.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-virgil",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taskle.",
  description:
    "Taskle is a personal task management application designed to help you organize and prioritize your daily tasks efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${virgilFont.variable} ${patrickHand.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
