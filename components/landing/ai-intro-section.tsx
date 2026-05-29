import { aiSteps, searchIntentItems } from "@/components/landing/content";
import { SectionHeading } from "@/components/landing/section-heading";

export function AiIntroSection() {
  return (
    <section className="border-b bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="AI 어종 판별"
          title="사진 1장으로 어종 후보를 빠르게 확인합니다."
          description="웹에서는 로그인 없이 판별을 시작하고, 앱에서는 확인한 결과를 조과 기록 흐름으로 이어갈 수 있습니다."
        />

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
