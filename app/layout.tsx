import type { Metadata } from "next";
import {
  fontArchivo,
  fontArchivoDisplay,
  fontBigShoulders,
  fontCairo,
} from "@/app/fonts";
import "@/app/globals.css";

const themeBoot = `(function(){try{var t=null;try{t=localStorage.getItem("rklt-theme");}catch(e){t=null;}if(t!=="night"&&t!=="day"){try{t=window.matchMedia("(prefers-color-scheme: light)").matches?"day":"night";}catch(e){t="night";}}var root=document.documentElement;root.setAttribute("data-theme",t);root.style.colorScheme=t==="day"?"light":"dark";}catch(e){document.documentElement.setAttribute("data-theme","night");document.documentElement.style.colorScheme="dark";}})();`;

// Home preloads only the crane cutout. The port plates stay unloaded while the intro is the crane study.
const heroBoot = `(function(){try{if(!/^\\/(en|ar)\\/?$/.test(location.pathname))return;var h=document.head;var l=document.createElement("link");l.rel="preload";l.as="image";l.href="/assets/hero/crane-container.webp";l.setAttribute("fetchpriority","high");h.appendChild(l);var reduce=false;try{reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(err){reduce=false;}if(!reduce){document.documentElement.classList.add("rklt-intro-lock");setTimeout(function(){var root=document.documentElement;if(!root.classList.contains("rklt-intro-lock")||root.hasAttribute("data-intro-live"))return;root.classList.remove("rklt-intro-lock");var intro=document.querySelector(".rklt-intro");if(intro&&intro.parentNode)intro.parentNode.removeChild(intro);},9000);}}catch(e){}})();`;

export const metadata: Metadata = {
  title: "RKLT | ربوع الخير لنقل وشحن البضائع",
  description:
    "RKLT (Rubu' Al-Khair). Over 30 years of dependable sea, air, and land freight forwarding and customs operations in Jordan and worldwide.",
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
      suppressHydrationWarning
      className={`${fontArchivo.variable} ${fontArchivoDisplay.variable} ${fontBigShoulders.variable} ${fontCairo.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <script dangerouslySetInnerHTML={{ __html: heroBoot }} />
      </head>
      <body className="min-h-screen flex flex-col bg-role-field text-role-text antialiased">
        {children}
      </body>
    </html>
  );
}
