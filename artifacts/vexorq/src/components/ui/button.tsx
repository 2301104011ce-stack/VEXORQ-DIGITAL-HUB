import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-display font-bold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)] border border-primary/50",
        outline: "border-2 border-white/10 bg-transparent hover:bg-white/5 text-foreground",
        ghost: "hover:bg-white/5 hover:text-foreground text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-14 rounded-xl px-8 text-lg",
        icon: "h-10 w-10",
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
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // Build the className with all variants
    const finalClassName = cn(buttonVariants({ variant, size, className }));

    // When asChild is true, Slot merges props into the child element
    // So we only pass the mergedChildren (without extra wrappers)
    const childContent = (
      <>
        {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        {children}
      </>
    );

    if (asChild) {
      return (
        <Comp
          ref={ref}
          className={finalClassName}
          disabled={isLoading || disabled}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={finalClassName}
        {...props}
      >
        {childContent}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
