import React from "react";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/primitives/Button";
import { Icon } from "@/components/primitives/Icon";

export function PageInquiry({ locale }: { locale: Locale }) {
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    locale === "ar" ? siteConfig.whatsappDefaultMsgAr : siteConfig.whatsappDefaultMsgEn
  )}`;

  return (
    <Button
      href={href}
      external
      variant="primary"
      size="sm"
      icon={<Icon name="whatsapp" size={16} />}
      iconPosition="left"
    >
      {locale === "ar" ? "تواصل معنا" : "Start Conversation"}
    </Button>
  );
}
