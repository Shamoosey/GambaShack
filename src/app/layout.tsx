import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";

export const metadata: Metadata = {
  title: "Gamba Shack",
  description: "Welcome to the Gamba Shack",
};

const balatro = localFont({
  src: '../fonts/balatro.ttf',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={balatro.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
