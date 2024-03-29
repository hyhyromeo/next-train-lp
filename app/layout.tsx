import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LP in & out 🏃🏻‍♂️💨",
  description: "LP going in 🏃🏻‍♂️💨 , LP going out 🏃🏻‍♂️💨",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/002.png" sizes="1" />
        <link href="/222.png" rel="apple-touch-startup-image" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
