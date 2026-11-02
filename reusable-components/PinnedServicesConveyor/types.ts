export interface ServiceSlideItem {
  id: string;
  numeral: string;
  category: string;
  title: string;
  tagline?: string;
  description: string;
  features?: string[];
  photo: string;
  video?: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface NavGroup {
  label: string;
  indexes: number[];
}

export interface PinnedServicesConveyorProps {
  slides: ServiceSlideItem[];
  groups?: NavGroup[];
  direction?: "ltr" | "rtl";
  className?: string;
  catalogLink?: {
    label: string;
    href: string;
  };
  quoteText?: string;
  whatsappNumber?: string;
  defaultWhatsappMsg?: string;
}
