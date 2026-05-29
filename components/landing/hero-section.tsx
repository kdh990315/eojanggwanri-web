import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  Info,
  MapPin,
  NotebookPen,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="border-b">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium text-muted-foreground">
            <NotebookPen className="size-4 text-primary" />
            낚시의 순간을 기록으로 남기는 앱
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-foreground sm:text-5xl lg:text-6xl">
            어장관리로 내 조과를 낚시 노트처럼 남기세요.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            잡은 물고기 사진, 날짜, 위치, 물때, 날씨를 한곳에 정리하고
            필요할 때 AI 어종 판별로 후보를 참고할 수 있습니다.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#catch-record">
                조과 기록 앱 알아보기
                <ChevronRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#download">앱 다운로드 준비 상태</Link>
            </Button>
          </div>
          <p className="mt-4 flex max-w-xl gap-2 text-sm leading-6 text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0 text-primary" />
            AI 어종 판별은 별도 페이지에서 진행합니다. 메인 페이지에서는
            어장관리 앱의 기록 흐름과 다운로드 준비 상태를 안내합니다.
          </p>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-[440px] rounded-[2rem] border bg-secondary p-4 shadow-sm">
            <div className="rounded-[1.5rem] border bg-background p-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="text-sm font-semibold">조과 기록 미리보기</p>
                  <p className="text-xs text-muted-foreground">
                    앱 화면 이미지로 교체 예정
                  </p>
                </div>
                <div className="rounded-full bg-accent p-2 text-primary">
                  <NotebookPen className="size-5" />
                </div>
              </div>

              <div className="mt-4 aspect-[4/3] rounded-xl border border-dashed bg-secondary p-4">
                <div className="flex h-full flex-col items-center justify-center rounded-lg bg-white text-center">
                  <CalendarDays className="mb-3 size-9 text-primary" />
                  <p className="text-sm font-semibold text-foreground">
                    사진, 날짜, 위치, 물때를 한 기록에
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    실제 앱 화면이 준비되면 이 영역에 배치합니다.
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {[
                  { label: "2026년 5월 30일 조과", icon: CalendarDays },
                  { label: "방파제 포인트 기록", icon: MapPin },
                  { label: "물때와 날씨 함께 정리", icon: NotebookPen },
                ].map(
                  (item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-lg border bg-white px-3 py-3 text-sm"
                    >
                      <span className="font-medium">{item.label}</span>
                      <item.icon className="size-4 text-muted-foreground" />
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
