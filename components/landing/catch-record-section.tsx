import { CheckCircle2 } from "lucide-react";

import { recordPoints } from "@/components/landing/content";
import { SectionHeading } from "@/components/landing/section-heading";

export function CatchRecordSection() {
  return (
    <section id="catch-record" className="border-b bg-secondary py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <SectionHeading
          eyebrow="조과 기록"
          title="물고기 이름을 찾은 다음, 낚시의 맥락까지 남깁니다."
          description="잡은 순간의 정보가 함께 남아야 나중에 다시 볼 수 있는 낚시 노트가 됩니다."
        />

        <div className="rounded-lg border bg-white p-6">
          <ul className="space-y-5">
            {recordPoints.map((point) => (
              <li key={point} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="leading-7 text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-lg border bg-secondary p-4 text-sm leading-6 text-muted-foreground">
            고급 통계는 MVP 이후 확장 가치로 다룹니다. 현재 소개 페이지에서는
            조과 기록이 쌓였을 때 확장 가능한 방향만 설명합니다.
          </div>
        </div>
      </div>
    </section>
  );
}
