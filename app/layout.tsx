import { ReactNode } from 'react';
import { LayoutProps as NextLayoutProps } from 'next'; // Import the required type from Next.js
import localFont from 'next/font/local';
import "./globals.css";

// Define the geistSans font
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

// Define the geistMono font
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata for the page
export const metadata = {
  title: "Resume Builder",
  description: "Resume builder with all the basic functionality",
};

// RootLayout component type
interface LayoutProps extends NextLayoutProps { // Extend the LayoutProps from Next.js
  children: ReactNode;
}

// RootLayout component
export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
