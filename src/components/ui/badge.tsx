import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "danger" | "gray" | "outline";
  size?: "sm" | "md";
  className?: string;
}

const variants = {
  primary: "bg-[#F5EBFF] text-[#8F00FF] border border-[#EAD6FF]",
  success: "bg-green-50 text-green-700 border border-green-200",
  warning: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  danger: "bg-red-50 text-red-700 border border-red-200",
  gray: "bg-gray-100 text-gray-600 border border-gray-200",
  outline: "bg-transparent text-[#8F00FF] border border-[#8F00FF]",
};

const sizes = {
  sm: "text-xs px-2 py-0.5 rounded-md",
  md: "text-xs font-semibold px-3 py-1 rounded-full",
};

export function Badge({
  children,
  variant = "primary",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium whitespace-nowrap",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
