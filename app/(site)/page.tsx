import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { MainTitle } from "@/components/landing/MainTitle";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { SubTitle } from "@/components/landing/SubTitle";
import { faqItems } from "@/constants/FAQItems";

const seoStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "어장관리",
  description:
    "물고기 사진으로 AI 어종 후보를 확인하고 날짜, 위치, 물때, 날씨와 함께 조과를 기록하는 낚시 노트 앱 소개 페이지입니다.",
  inLanguage: "ko-KR",
  url: "https://eojanggwanri-web.vercel.app/",
};

function AppScreenMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[330px]">
      <div className="rounded-[2.25rem] border-[10px] border-[#101828] bg-[#101828] shadow-[0_28px_70px_rgba(16,24,40,0.22)]">
        <div className="relative aspect-[9/16] overflow-hidden rounded-[1.65rem] bg-white">
          <div className="absolute left-1/2 top-2 h-6 w-28 -translate-x-1/2 rounded-full bg-[#101828]" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-white text-[#191f28]">
        <section className="relative h-screen h-dvh overflow-hidden text-[#191f28]">
          <div className="absolute inset-0">
            <Image
              src="/images/main-hero-image.png"
              alt="낚시 위치와 조과 기록을 표현한 어장관리 히어로 이미지"
              priority
              fill
              sizes="100vw"
              className="object-cover object-bottom"
            />
          </div>

          <div className="relative z-10 mx-auto flex min-h-full w-full max-w-6xl flex-col items-center justify-center px-5 pb-[18vh] text-center sm:pb-[20vh]  lg:pb-[22vh]">
            <div>
              <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl lg:mx-0">
                사진 한 장으로
                <br />
                조과를 기록하세요
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-slate-600 md:mt-7 md:text-lg md:leading-8 lg:mx-0">
                사진, 어종 데이터, 조과 기록을 한 번에.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-9">
                <Link
                  href="/ai-species"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-main-color-100 px-7 text-base font-black text-white shadow-sm transition hover:bg-slate-700 md:h-14 sm:w-auto"
                >
                  AI 어종 판별하기
                  <ArrowRight className="size-5" />
                </Link>
                <a
                  href="#record"
                  className="inline-flex h-12 w-full items-center justify-center rounded-md bg-white/82 px-7 text-base font-black text-[#191f28] ring-1 ring-slate-200 transition hover:bg-white md:h-14 sm:w-auto"
                >
                  조과 기록 앱 알아보기
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 조과 기록 스크린 */}
        <section
          id="record"
          className="border-b border-slate-200 bg-white px-5 py-24 md:py-32"
        >
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <SectionLabel className="text-sub-color-100">
                조과 기록
              </SectionLabel>
              <MainTitle>
                낚시의 순간을
                <br />
                흐려지지 않는 기록으로
              </MainTitle>
              <SubTitle>
                사진 한 장에 날짜, 위치, 물때, 날씨를 함께 남겨두세요. 시간이
                지나도 어디서 어떤 조건에 잡았는지 쉽게 다시 볼 수 있습니다.
              </SubTitle>
            </div>
            <AppScreenMockup />
          </div>
        </section>

        {/* ai 어종 분석 스크린 */}
        <section id="ai-species" className="bg-[#f7f9fb] px-5 py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <AppScreenMockup />
            <div>
              <SectionLabel className="text-sub-color-300">
                어종 데이터
              </SectionLabel>
              <MainTitle>
                사진을 촬영하거나 선택하고
                <br />
                어종 판별
              </MainTitle>
              <p className="mt-1 text-sm leading-8 text-slate-400">
                * 판별 결과는 확정값이 아닌 참고용 후보입니다.
              </p>
              <SubTitle>
                {/* 어종의 이름, 특징부터 금어기·금지체장을 확인합니다. */}
                업로드한 사진으로 어종 판별 결과를 확인하고, 해당 어종의 특징과
                금어기·금지체장 정보를 함께 살펴볼 수 있습니다.
              </SubTitle>

              <Link
                href="/ai-species"
                className="mt-10 inline-flex h-14 items-center justify-center gap-2 rounded-md bg-main-color-100 px-7 text-base font-black text-white transition hover:bg-slate-700"
              >
                AI 어종 판별하기
                <ArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 내 조과 기록 모아보기 스크린 */}
        <section id="features" className="bg-white px-5 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <SectionLabel className="text-sub-color-100">
                  조과 모아보기
                </SectionLabel>
                <MainTitle>
                  잡은 순간부터
                  <br />
                  다시 찾는 날까지
                </MainTitle>
                <SubTitle>
                  최근 조과, 상세 기록, 내가 잡은 어종을 한곳에 모아봅니다.
                  조과가 쌓일수록 나만의 낚시 노트가 더 선명해집니다.
                </SubTitle>
              </div>
              <AppScreenMockup />
            </div>
          </div>
        </section>

        {/* 나만의 포인트 지도 스크린 */}
        <section id="point-map" className="bg-[#f7f9fb] px-5 py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <AppScreenMockup />
            <div>
              <SectionLabel className="text-sub-color-300">
                포인트 지도
              </SectionLabel>
              <MainTitle>
                조과 기록 후 자동 등록되는
                <br />
                나만의 포인트 지도
              </MainTitle>

              <SubTitle>
                조과를 저장하면 포인트가 기록과 함께 자동으로 정리됩니다. 다음
                출조 때 지난 위치와 조건을 다시 확인하며 내 낚시 패턴을 이어갈
                수 있습니다.
              </SubTitle>

              <Link
                href="/ai-species"
                className="mt-10 inline-flex h-14 items-center justify-center gap-2 rounded-md bg-main-color-100 px-7 text-base font-black text-white transition hover:bg-slate-700"
              >
                AI 어종 판별하기
                <ArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionLabel className="text-sub-color-100">FAQ</SectionLabel>
              <MainTitle>
                판별과 기록 전에
                <br />
                확인해야 할 것
              </MainTitle>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSexQf4Mtne8w5iEjDjW-06VGYFV1cdGLUDX8Q_8gT6kLvRCfQ/viewform?usp=dialog"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-slate-900"
              >
                문의 · 오류 제보 · 아이디어 제안
                <ArrowRight className="size-4" />
              </a>
            </div>
            <FaqAccordion items={faqItems} />
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoStructuredData) }}
      />
    </>
  );
}
