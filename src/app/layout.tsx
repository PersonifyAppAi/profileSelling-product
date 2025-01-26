import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Personify",
  description: "Applicant Profiles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-slate-50 h-screen"
      >
        <Navbar />
        <main className="px-4 md:px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
