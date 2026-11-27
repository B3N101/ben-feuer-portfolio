import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Montserrat, Inter } from "next/font/google";
import { IntroLoader, INTRO_SCRIPT } from "@/components/site/IntroLoader";
import "./globals.css";
import "./site.css";

// Space Grotesk is still used by the blog.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-head",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ben Feuer · Mechanical Engineering Portfolio",
  description:
    "Mechanical Engineering student at the University of Michigan. Combat robots, competition robots, and fluid systems — designed, built and tested.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${montserrat.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body className="min-h-full">
        <IntroLoader />
        {children}
      </body>
    </html>
  );
}
