import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "rounded-2xl bg-primary text-primary-foreground shadow-indigo hover:shadow-glow hover:scale-105 active:scale-100",
        destructive: "rounded-2xl bg-destructive text-destructive-foreground shadow-md hover:shadow-lg hover:scale-105",
        outline: "rounded-2xl border-2 border-input bg-background hover:bg-primary/5 hover:border-primary hover:text-primary",
        secondary: "rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "rounded-lg hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "rounded-2xl bg-gradient-primary text-primary-foreground shadow-indigo hover:shadow-glow hover:scale-105",
        accent: "rounded-2xl bg-accent text-accent-foreground shadow-md hover:shadow-accent-glow hover:scale-105",
        hero: "rounded-2xl bg-gradient-primary text-primary-foreground shadow-indigo hover:shadow-glow hover:scale-105 font-bold",
        "hero-secondary": "rounded-2xl glass border-2 border-primary/20 text-foreground hover:border-primary/40 hover:bg-primary/5 shadow-lg hover:shadow-xl font-semibold backdrop-blur-xl",
        "glass-action": "rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 text-white hover:bg-white/30 shadow-lg",
        buy: "rounded-2xl bg-accent text-accent-foreground shadow-md hover:shadow-accent-glow hover:scale-105 font-bold",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-xl px-4",
        lg: "h-12 rounded-2xl px-8",
        xl: "h-14 rounded-2xl px-10 text-base",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };