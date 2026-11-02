import { Archivo, Big_Shoulders_Display, Cairo } from "next/font/google";

export const fontArchivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const fontArchivoDisplay = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo-display",
  display: "swap",
});

export const fontBigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  variable: "--font-big-shoulders",
  display: "swap",
  weight: ["700", "800", "900"],
});

export const fontCairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
