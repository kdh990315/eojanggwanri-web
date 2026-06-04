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
        "mt-5 text-4xl font-black leading-tight md:text-5xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
