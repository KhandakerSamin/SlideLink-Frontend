import { Geist, Geist_Mono } from "next/font/google";
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
  title: "SlideLink",
  description: "SlideLink - Your Gateway to Seamless Presentations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>

    </html>
  );
}
