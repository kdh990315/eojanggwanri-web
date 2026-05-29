import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-normal sm:text-4xl">
          지금 사진으로 어종 후보를 확인해 보세요.
        </h2>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
          판별 결과는 참고용입니다. 결과를 확인한 뒤 어장관리 앱에서 조과
          기록으로 이어갈 수 있습니다.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
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
