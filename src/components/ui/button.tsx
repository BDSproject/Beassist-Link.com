import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
}

const variants = {
  primary:
    "bg-[#8F00FF] text-white hover:bg-[#7200CC] active:bg-[#560099] shadow-[0_4px_20px_rgba(143,0,255,0.3)] hover:shadow-[0_8px_30px_rgba(143,0,255,0.4)]",
  secondary:
    "bg-black text-white hover:bg-gray-900 active:bg-gray-800",
  outline:
    "border-2 border-[#8F00FF] text-[#8F00FF] hover:bg-[#F5EBFF] active:bg-[#EAD6FF]",
  ghost:
    "text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200",
  danger:
    "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm rounded-lg h-8",
  md: "px-5 py-2.5 text-sm rounded-xl h-10",
  lg: "px-6 py-3 text-base rounded-xl h-12",
  xl: "px-8 py-4 text-base rounded-2xl h-14",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-[#8F00FF] focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
