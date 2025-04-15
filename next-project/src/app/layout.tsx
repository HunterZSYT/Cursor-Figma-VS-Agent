import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "./client-layout";

export const metadata: Metadata = {
  title: "PC Park | Premier Computer Hardware Store in Bangladesh",
  description: "Shop the latest computer components, laptops, and peripherals. Custom PC building service available. Located in Uttara, Dhaka.",
  keywords: "computer shop, PC components, custom PC build, Bangladesh, hardware store, Dhaka, PC Park",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
