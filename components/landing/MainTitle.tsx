import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type MainTitleProps = {
  children: ReactNode;
  className?: string;
};

export function MainTitle({ children, className }: MainTitleProps) {
  return (
    <h2
      className={cn(
        "mt-4 text-3xl font-black leading-tight sm:text-4xl md:mt-5 md:text-5xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
