import { Geist, Geist_Mono } from "next/font/google";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

import "./globals.css"; // Ensure global styles are imported
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SlideLink - Samin.DEV",
  description: "SlideLink - Your Gateway to Seamless Presentations",
  icons: {
    icon: "/favicon3.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      className={outfit.className}
      >
        {children}
      </body>

    </html>
  );
}
