import React from "react";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";

interface JsonLdProps {
  locale: Locale;
}

export const JsonLd: React.FC<JsonLdProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const baseUrl = "https://rklt.ltd";

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${baseUrl}/#organization`,
        name: isAr ? siteConfig.legalName : "RKLT · Rubu' Al-Khair for Transport & Shipping",
        alternateName: ["RKLT", "Rubu' Al-Khair", "ربوع الخير لنقل وشحن البضائع", "Rami Kalouti Logistics"],
        url: `${baseUrl}/${locale}`,
        logo: `${baseUrl}/assets/rklt-visual-board.jpg`,
        image: `${baseUrl}/assets/rklt-visual-board.jpg`,
        foundingDate: "1994",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        priceRange: "$$$",
        slogan: isAr
          ? "دقة، سرعة، وموثوقية في كل ميل."
          : "Precision, speed and reliability in every mile.",
        description: isAr
          ? "شركة ربوع الخير لنقل وشحن البضائع والتخليص الجمركي المرخص (رخصة رقم 412) في ميناء العقبة وعمّان والمنافذ الحدودية الأردنية منذ عام 1994."
          : "Licensed Jordanian freight forwarder and statutory customs brokerage (License #412) operating across Port of Aqaba, Queen Alia International Airport (AMM), Amman, and GCC/Iraq overland corridors since 1994.",
        address: {
          "@type": "PostalAddress",
          streetAddress: isAr ? siteConfig.headquarters.addressAr : siteConfig.headquarters.addressEn,
          addressLocality: "Amman",
          addressRegion: "Amman Governorate",
          addressCountry: "JO",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 31.9539,
          longitude: 35.9106,
        },
        areaServed: [
          { "@type": "Country", name: "Jordan", sameAs: "https://en.wikipedia.org/wiki/Jordan" },
          { "@type": "Country", name: "Saudi Arabia" },
          { "@type": "Country", name: "Iraq" },
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "Place", name: "Port of Aqaba / Aqaba Container Terminal (ACT)" },
          { "@type": "Place", name: "Queen Alia International Airport (AMM)" },
          { "@type": "Place", name: "Zarqa Free Zone" },
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Customs Brokerage License",
            name: "Jordan Customs Department Brokerage License #412",
            recognizedBy: {
              "@type": "GovernmentOrganization",
              name: "Jordan Customs Department (دائرة الجمارك الأردنية)",
            },
          },
        ],
        department: [
          {
            "@type": "LocalBusiness",
            name: isAr ? "مكتب عمليات ميناء العقبة (RKLT Aqaba Port)" : "RKLT Aqaba Port Operations Desk",
            telephone: siteConfig.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Aqaba Container Terminal (ACT) & Customs Plaza",
              addressLocality: "Aqaba",
              addressRegion: "Aqaba Special Economic Zone (ASEZA)",
              addressCountry: "JO",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 29.5321,
              longitude: 35.0063,
            },
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: isAr ? "خدمات الشحن والتخليص الجمركي" : "Multimodal Freight & Customs Brokerage Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: isAr ? "الشحن البحري (ميناء العقبة FCL/LCL)" : "Sea Freight Forwarding (Port of Aqaba FCL/LCL)",
                areaServed: "Jordan & Red Sea",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: isAr ? "الشحن الجوي السريع (مطار الملكة علياء AMM)" : "Expedited Air Cargo (Queen Alia Airport AMM)",
                areaServed: "Global & Jordan",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: isAr ? "النقل البري والترانزيت المعلق للخليج والعراق" : "Cross-Border Overland & Bonded Trucking (GCC & Iraq)",
                areaServed: "Jordan, Saudi Arabia, Iraq, UAE",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: isAr ? "التخليص الجمركي المعتمد (ترخيص رقم 412)" : "Statutory Customs Clearance & ASYCUDA Brokerage (#412)",
                areaServed: "Jordan",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: isAr ? "سلاسل التبريد والشحن المبرد (-25° إلى +15° مئوية)" : "Active Cold Chain & Reefer Logistics (-25°C to +15°C)",
                areaServed: "Jordan & GCC",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "RKLT | Rubu' Al-Khair Freight & Customs Logistics",
        inLanguage: ["en-JO", "ar-JO"],
        publisher: { "@id": `${baseUrl}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
};
