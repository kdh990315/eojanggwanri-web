import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-normal sm:text-4xl">
          조과를 기록으로 남길 준비를 하고 있습니다.
        </h2>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
          어장관리는 잡은 순간의 사진, 날짜, 위치, 물때, 날씨를 함께 정리하는
          낚시 기록 앱입니다. 어종이 궁금할 때는 전용 페이지에서 AI 후보를
          참고할 수 있습니다.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="#download">
              앱 다운로드 준비 상태
              <ChevronRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/ai-species">
              AI 어종 판별하기
              <ChevronRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
