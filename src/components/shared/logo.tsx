import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "white";
}

const sizeClasses = {
  sm: "text-lg font-bold",
  md: "text-2xl font-bold",
  lg: "text-3xl font-bold",
  xl: "text-4xl font-bold",
};

export function Logo({ className, size = "md", variant = "default" }: LogoProps) {
  const isWhite = variant === "white";

  return (
    <span className={cn("tracking-tight select-none", sizeClasses[size], className)}>
      <span className={isWhite ? "text-white" : "text-black"}>Beassist</span>
      <span style={{ color: isWhite ? "#c084fc" : "#8F00FF" }}>Link</span>
    </span>
  );
}
