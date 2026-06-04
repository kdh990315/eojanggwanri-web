import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SubTitleProps = {
  children: ReactNode;
  className?: string;
};

export function SubTitle({ children, className }: SubTitleProps) {
  return (
    <p className={cn("mt-6 text-lg leading-8 text-slate-600", className)}>
      {children}
    </p>
  );
}
