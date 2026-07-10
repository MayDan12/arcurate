import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arcurate",
  description: "Arcurate - Architecture Made Clear",
  icons: {
    icon: "/arcurate.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.className} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
