export type Language = "en" | "ur";

export type Direction = "ltr" | "rtl";

export interface TranslationContent {
  [key: string]: string | TranslationContent;
}

export interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export interface SectionHeadingProps {
  subtitle: string;
  title: string;
  description?: string;
  alignment?: "left" | "center" | "right";
  light?: boolean;
}

export interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "gold";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "dark";
  className?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

export interface FooterSection {
  title: string;
  links: NavLink[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export interface AccordionItemData {
  id: string;
  title: string;
  content: string | string[];
}
