"use client";

import { useState } from "react";
import { CheckCircle2, Plus } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

export const FaqAccordion = ({ items }: { items: FaqItem[] }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-slate-200 border-y border-slate-200">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const contentId = `faq-panel-${index}`;

        return (
          <div key={item.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="text-lg font-black">{item.question}</span>
              {isOpen ? (
                <CheckCircle2 className="size-5 shrink-0 text-sub-color-300" />
              ) : (
                <Plus className="size-5 shrink-0 text-slate-400" />
              )}
            </button>
            <div
              id={contentId}
              hidden={!isOpen}
              className="pb-6 pr-10 text-base leading-7 text-slate-600"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
};
