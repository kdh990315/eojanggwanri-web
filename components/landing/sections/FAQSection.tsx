import { ArrowRight } from "lucide-react";

import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { MainTitle } from "@/components/landing/MainTitle";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { faqItems } from "@/constants/FAQItems";

export const FAQSection = () => {
  return (
    <section className="bg-white px-5 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionLabel className="text-sub-color-100">FAQ</SectionLabel>
          <MainTitle>
            판별과 기록 전에
            <br />
            확인해야 할 것
          </MainTitle>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSexQf4Mtne8w5iEjDjW-06VGYFV1cdGLUDX8Q_8gT6kLvRCfQ/viewform?usp=dialog"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-slate-900"
          >
            문의 · 오류 제보 · 아이디어 제안
            <ArrowRight className="size-4" />
          </a>
        </div>
        <FaqAccordion items={faqItems} />
      </div>
    </section>
  );
};
