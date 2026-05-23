import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Syne } from "next/font/google";
import type { PropsWithChildren } from "react"; import { useEffect } from "react";

import { siteConfig } from "@/config";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ThemeProvider } from "./provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export const metadata: Metadata = siteConfig;

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${syne.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
