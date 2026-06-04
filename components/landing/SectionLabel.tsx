import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
};

export function SectionLabel({
  children,
  className,
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-sm font-black uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
