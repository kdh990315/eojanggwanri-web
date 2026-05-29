import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { aiSteps, searchIntentItems } from "@/components/landing/content";
import { SectionHeading } from "@/components/landing/section-heading";
import { Button } from "@/components/ui/button";

export function AiIntroSection() {
  return (
    <section
      id="ai-species-intro"
      className="border-b bg-background py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="AI 어종 판별"
          title="어종 분석은 전용 페이지에서 진행합니다."
          description="소개 페이지에는 업로드 UI를 두지 않습니다. 사진을 올리고 후보 결과를 확인하는 흐름은 AI 어종 판별 페이지에서만 제공합니다."
        >
          <div className="mt-6">
            <Button asChild>
              <Link href="/ai-species">
                AI 어종 판별하기
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          </div>
        </SectionHeading>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {aiSteps.map((step, index) => (
            <div key={step.title} className="rounded-lg border bg-white p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="rounded-md bg-accent p-3 text-primary">
                  <step.icon className="size-5" />
                </div>
                <span className="text-sm font-semibold text-muted-foreground">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 border-t pt-8 md:grid-cols-3">
          {searchIntentItems.map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="mt-1 text-primary">
                <item.icon className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
