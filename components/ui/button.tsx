import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50",
        secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        ghost: "hover:bg-gray-100 text-gray-800",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 rounded-md",
        sm: "h-9 px-3 rounded-md text-sm",
        lg: "h-12 px-6 rounded-lg text-base",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded h-11 px-4 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",

          variant === "default" && "bg-primary text-white", 
variant === "outline" && "border border-[##0D3B5D] bg-white text-[##0D3B5D]", 
variant === "destructive" && "bg-red-600 text-white hover:bg-red-700",
variant === "secondary" && "bg-gray-100 text-gray-800 hover:bg-gray-200",
variant === "ghost" && "hover:bg-gray-100 text-gray-800",
variant === "link" && "text-primary underline-offset-4 hover:underline",


          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";



export { Button, buttonVariants };
