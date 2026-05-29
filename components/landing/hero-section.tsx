import Link from "next/link";
import { Camera, ChevronRight, Info, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="border-b">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium text-muted-foreground">
            <Sparkles className="size-4 text-primary" />
            AI 어종 후보 확인부터 조과 기록까지
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-foreground sm:text-5xl lg:text-6xl">
            사진으로 물고기 이름을 찾고, 내 조과를 낚시 노트로 남기세요.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            어장관리는 AI 어종 판별과 조과 기록을 연결해 낚시 사진,
            위치, 날짜, 물때, 날씨를 함께 정리하는 낚시 기록 앱입니다.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/ai-species">
                AI 어종 판별하기
                <ChevronRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#download">앱 다운로드</Link>
            </Button>
          </div>
          <p className="mt-4 flex max-w-xl gap-2 text-sm leading-6 text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0 text-primary" />
            AI 결과는 어종 후보와 참고 정보입니다. 저장하거나 활용하기 전
            사용자가 직접 확인해 주세요.
          </p>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-[440px] rounded-[2rem] border bg-secondary p-4 shadow-sm">
            <div className="rounded-[1.5rem] border bg-background p-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="text-sm font-semibold">AI 어종 판별 예시</p>
                  <p className="text-xs text-muted-foreground">
                    실제 이미지로 교체 예정
                  </p>
                </div>
                <div className="rounded-full bg-accent p-2 text-primary">
                  <Camera className="size-5" />
                </div>
              </div>

              <div className="mt-4 aspect-[4/3] rounded-xl border border-dashed bg-[linear-gradient(135deg,#f8fafc,#ffffff)] p-4">
                <div className="flex h-full flex-col items-center justify-center rounded-lg bg-white/70 text-center">
                  <Camera className="mb-3 size-9 text-primary" />
                  <p className="text-sm font-semibold text-foreground">
                    앱 화면 또는 판별 결과 이미지
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    준비된 이미지로 바로 교체할 수 있는 영역입니다.
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {["우럭 후보 68%", "조과 기록 초안 생성", "위치와 물때 함께 정리"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-lg border bg-white px-3 py-3 text-sm"
                    >
                      <span className="font-medium">{item}</span>
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
