import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MainTitle } from "@/components/landing/MainTitle";
import { ProductScreen } from "@/components/landing/ProductScreen";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { SubTitle } from "@/components/landing/SubTitle";

export function AiSpeciesSection() {
  return (
    <section
      id="ai-species"
      className="bg-[#f7f9fb] px-5 py-20 md:py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <ProductScreen
          src="/images/ai-store-image.png"
          alt="사진으로 어종 후보와 특징을 확인하는 어장관리 AI 어종 분석 화면"
          className="order-2 lg:order-1"
        />
        <div className="order-1 text-center lg:order-2 lg:text-left">
          <SectionLabel className="text-sub-color-300">어종 데이터</SectionLabel>
          <MainTitle>
            사진을 촬영하거나 선택하고
            <br />
            AI 어종 판별
          </MainTitle>
          <p className="mt-1 text-sm leading-8 text-slate-400">
            * 판별 결과는 확정값이 아닌 참고용 후보입니다.
          </p>
          <SubTitle>
            업로드한 사진으로 어종 판별 결과를 확인하고, 해당 어종의 특징과
            금어기·금지체장 정보를 함께 살펴볼 수 있습니다.
          </SubTitle>

          <Link
            href="/ai-species"
            className="mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-main-color-100 px-7 text-base font-black text-white transition hover:bg-slate-700 sm:w-auto lg:mt-10"
          >
            AI 어종 판별하기
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
