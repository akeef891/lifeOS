import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
}

const variants = {
  primary:
    "bg-violet-600 text-white hover:bg-violet-500 focus-visible:ring-violet-500/50",
  secondary:
    "border border-white/[0.08] bg-white/[0.04] text-foreground hover:bg-white/[0.08] focus-visible:ring-white/20",
  ghost: "text-muted hover:bg-white/[0.06] hover:text-foreground focus-visible:ring-white/20",
};

const sizes = {
  sm: "h-9 min-w-9 px-3 text-xs rounded-lg",
  md: "h-10 min-w-10 px-4 text-sm rounded-lg",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
