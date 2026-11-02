import React from "react";
import {
  Ship,
  Plane,
  Truck,
  Shield,
  ShieldCheck,
  Globe,
  Clock,
  Phone,
  Mail,
  ArrowUpRight,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  MapPin,
  FileText,
  Boxes,
  Thermometer,
  Anchor,
  Compass,
  Cpu,
  MessageCircle,
  Menu,
  X,
  Sun,
  Moon,
  Search,
  Copy,
  ExternalLink,
  Layers,
  Radio,
  Activity,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/cn";

export type IconName =
  | "ship"
  | "plane"
  | "truck"
  | "shield"
  | "shield-check"
  | "globe"
  | "clock"
  | "phone"
  | "mail"
  | "whatsapp"
  | "arrow-up-right"
  | "arrow-right"
  | "check"
  | "chevron-down"
  | "chevron-right"
  | "map-pin"
  | "file-text"
  | "boxes"
  | "reefer"
  | "anchor"
  | "compass"
  | "cpu"
  | "menu"
  | "close"
  | "sun"
  | "moon"
  | "search"
  | "copy"
  | "external-link"
  | "layers"
  | "radio"
  | "activity"
  | "file-check";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  className,
  ...props
}) => {
  const iconProps = {
    size,
    className: cn("inline-block flex-shrink-0", className),
    ...props,
  };

  switch (name) {
    case "ship":
      return <Ship {...iconProps} />;
    case "plane":
      return <Plane {...iconProps} />;
    case "truck":
      return <Truck {...iconProps} />;
    case "shield":
      return <Shield {...iconProps} />;
    case "shield-check":
      return <ShieldCheck {...iconProps} />;
    case "globe":
      return <Globe {...iconProps} />;
    case "clock":
      return <Clock {...iconProps} />;
    case "phone":
      return <Phone {...iconProps} />;
    case "mail":
      return <Mail {...iconProps} />;
    case "whatsapp":
      return <MessageCircle {...iconProps} />;
    case "arrow-up-right":
      return <ArrowUpRight {...iconProps} />;
    case "arrow-right":
      return <ArrowRight {...iconProps} />;
    case "check":
      return <Check {...iconProps} />;
    case "chevron-down":
      return <ChevronDown {...iconProps} />;
    case "chevron-right":
      return <ChevronRight {...iconProps} />;
    case "map-pin":
      return <MapPin {...iconProps} />;
    case "file-text":
      return <FileText {...iconProps} />;
    case "boxes":
      return <Boxes {...iconProps} />;
    case "reefer":
      return <Thermometer {...iconProps} />;
    case "anchor":
      return <Anchor {...iconProps} />;
    case "compass":
      return <Compass {...iconProps} />;
    case "cpu":
      return <Cpu {...iconProps} />;
    case "menu":
      return <Menu {...iconProps} />;
    case "close":
      return <X {...iconProps} />;
    case "sun":
      return <Sun {...iconProps} />;
    case "moon":
      return <Moon {...iconProps} />;
    case "search":
      return <Search {...iconProps} />;
    case "copy":
      return <Copy {...iconProps} />;
    case "external-link":
      return <ExternalLink {...iconProps} />;
    case "layers":
      return <Layers {...iconProps} />;
    case "radio":
      return <Radio {...iconProps} />;
    case "activity":
      return <Activity {...iconProps} />;
    case "file-check":
      return <FileCheck {...iconProps} />;
    default:
      return null;
  }
};
