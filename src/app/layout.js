import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
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
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
