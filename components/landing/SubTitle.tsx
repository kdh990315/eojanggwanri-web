import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SubTitleProps = {
  children: ReactNode;
  className?: string;
};

export const SubTitle = ({ children, className }: SubTitleProps) => {
  return (
    <p
      className={cn(
        "mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8 lg:mx-0",
        className,
      )}
    >
      {children}
    </p>
  );
};
