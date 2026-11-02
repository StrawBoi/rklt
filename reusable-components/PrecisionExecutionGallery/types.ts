export interface ExecutionStepItem {
  id?: string;
  numeral: string;
  phase: string;
  title: string;
  description: string;
  tags: string[];
  photo: string;
}

export interface PrecisionExecutionGalleryProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  steps: ExecutionStepItem[];
  direction?: "ltr" | "rtl";
  className?: string;
}
