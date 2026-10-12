import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khizar | Software, AI, Data, FPGA",
  description: "Khizar's portfolio for software engineering, AI/ML, data systems, and FPGA digital design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
