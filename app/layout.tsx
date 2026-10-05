import type { Metadata } from "next";
import {
  fontArchivo,
  fontArchivoDisplay,
  fontBigShoulders,
  fontCairo,
} from "@/app/fonts";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "RKLT | ربوع الخير لنقل وشحن البضائع",
  description:
    "RKLT (Rubu' Al-Khair) — Over 30 years of dependable sea, air, and land freight forwarding and customs operations in Jordan and worldwide.",
  metadataBase: new URL("https://rklt.ltd"),
  icons: {
    icon: "/assets/rklt-logo-white.png",
    apple: "/assets/rklt-logo-white.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${fontArchivo.variable} ${fontArchivoDisplay.variable} ${fontBigShoulders.variable} ${fontCairo.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-ink-900 text-sand-100 antialiased selection:bg-terracotta-500 selection:text-ink-950">
        {children}
      </body>
    </html>
  );
}
