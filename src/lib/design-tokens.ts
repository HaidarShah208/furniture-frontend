export const spacing = {
  section: {
    sm: "py-12",
    md: "py-16 lg:py-20",
    lg: "py-20 lg:py-28",
    xl: "py-28 lg:py-36",
  },
  container: {
    default: "px-4 sm:px-6 lg:px-8",
    narrow: "px-4 sm:px-6",
    wide: "px-4 sm:px-6 lg:px-8 xl:px-12",
  },
} as const;

export const radius = {
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
  full: "rounded-full",
} as const;

export const shadows = {
  none: "",
  sm: "luxury-shadow",
  md: "luxury-shadow-lg",
  lg: "luxury-shadow-hover",
  xl: "luxury-shadow-xl",
} as const;

export const containerWidth = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  default: "max-w-7xl",
  lg: "max-w-[1440px]",
  full: "max-w-full",
} as const;

export const transitions = {
  fast: "transition-all duration-200",
  default: "transition-all duration-300",
  slow: "transition-all duration-500",
  slower: "transition-all duration-700",
} as const;

export const animationDuration = {
  fast: 0.2,
  default: 0.3,
  medium: 0.5,
  slow: 0.7,
  slower: 1.0,
} as const;

export const zIndex = {
  dropdown: "z-30",
  sticky: "z-40",
  overlay: "z-50",
  modal: "z-[60]",
  toast: "z-[70]",
  tooltip: "z-[80]",
} as const;

export const typography = {
  display: "text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl",
  h1: "text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl",
  h2: "text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
  h3: "text-2xl font-bold tracking-tight md:text-3xl",
  h4: "text-xl font-bold tracking-tight",
  h5: "text-lg font-semibold",
  body: "text-base leading-relaxed",
  bodyLg: "text-lg leading-relaxed",
  bodySm: "text-sm leading-relaxed",
  caption: "text-xs text-luxury-muted",
  label: "text-xs font-semibold uppercase tracking-[0.2em]",
  labelSm: "text-[10px] font-semibold uppercase tracking-[0.15em]",
} as const;
