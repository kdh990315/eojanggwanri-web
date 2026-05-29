import { featureItems } from "@/components/landing/content";
import { SectionHeading } from "@/components/landing/section-heading";

export function FeaturesSection() {
  return (
    <section id="features" className="border-b bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="앱 소개"
          title="어장관리에서 정리하는 낚시 기록"
          description="초보 낚시인이 실제로 마주하는 조과 등록과 확인 흐름에 집중합니다."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureItems.map((feature) => (
            <div key={feature.title} className="rounded-lg border bg-white p-6">
              <div className="mb-5 w-fit rounded-md bg-accent p-3 text-primary">
                <feature.icon className="size-5" />
              </div>
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
