import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { fishLinks } from "@/components/landing/content";
import { SectionHeading } from "@/components/landing/section-heading";

export function FishLinksSection() {
  return (
    <section className="border-b bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="어종 정보"
          title="자주 찾는 바다 어종"
          description="어종별 상세 정보 페이지는 생태, 금어기, 금지체장 데이터를 확인한 뒤 확장합니다."
        />

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {fishLinks.map((fish) => (
            <Link
              key={fish.href}
              href={fish.href}
              className="flex items-center justify-between rounded-lg border bg-white p-5 font-semibold transition hover:border-primary hover:text-primary"
            >
              {fish.label}
              <ChevronRight className="size-4" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
