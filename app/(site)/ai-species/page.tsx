import type { Metadata } from "next";

import { SpeciesUploadCard } from "@/components/ai-species/species-upload-card";

export const metadata: Metadata = {
  title: "AI 어종 판별 | 사진으로 물고기 이름 찾기",
  description:
    "물고기 사진을 업로드하면 AI가 어종 후보를 제안합니다. 판별 결과를 확인하고 어장관리 앱에서 조과 기록으로 남겨 보세요.",
  alternates: {
    canonical: "/ai-species",
  },
  openGraph: {
    title: "AI 어종 판별 | 사진으로 물고기 이름 찾기",
    description:
      "물고기 사진을 올리고 AI가 제안하는 어종 후보를 참고해 보세요.",
    url: "/ai-species",
  },
};

const photoTips = [
  {
    title: "물고기 전체가 보이게",
    description: "지느러미와 몸통 무늬가 잘리지 않도록 촬영해 주세요.",
  },
  {
    title: "밝고 선명하게",
    description: "역광과 흔들림을 피하면 특징을 더 잘 확인할 수 있습니다.",
  },
  {
    title: "한 마리 중심으로",
    description: "여러 마리보다 판별할 물고기 한 마리가 잘 보이는 사진이 좋습니다.",
  },
];

const photosToAvoid = [
  {
    title: "물고기가 너무 작게 나온 사진",
    description: "몸통과 지느러미의 특징을 확인하기 어렵습니다.",
  },
  {
    title: "어둡거나 흔들린 사진",
    description: "색상과 무늬가 실제와 다르게 보일 수 있습니다.",
  },
  {
    title: "여러 마리가 겹쳐 있는 사진",
    description: "판별할 물고기 한 마리를 구분하기 어렵습니다.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI 어종 판별",
  description:
    "물고기 사진을 업로드하고 AI가 제안하는 어종 후보를 참고하는 페이지입니다.",
  inLanguage: "ko-KR",
  url: "https://eojanggwanri-web.vercel.app/ai-species",
};

export default function AiSpeciesPage() {
  return (
    <>
      <main className="min-h-screen bg-[linear-gradient(180deg,#f7fbfd_0%,#ffffff_38%,#f7f9fb_100%)] px-5 pb-24 pt-28 text-[#191f28] md:pb-32 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:items-start">
            <SpeciesUploadCard />

            <section
              aria-labelledby="photo-tip-title"
              className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7"
            >
              <p className="text-sm font-black text-main-color-100">
                판별 사진 촬영 팁
              </p>
              <h2
                id="photo-tip-title"
                className="mt-2 text-2xl font-black leading-tight text-slate-950 sm:text-3xl"
              >
                이런 사진일수록 좋아요
              </h2>
              <div className="mt-5 grid gap-3">
                {photoTips.map((tip) => (
                  <article key={tip.title} className="flex gap-2.5">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-main-color-300"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-sm font-black text-slate-950">
                        {tip.title}
                      </h3>
                      <p className="mt-0.5 text-sm leading-5 text-slate-500">
                        {tip.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-7 border-t border-slate-200 pt-6">
                <h2 className="text-xl font-black leading-tight text-slate-950">
                  이런 사진은 피해주세요
                </h2>
                <div className="mt-5 grid gap-3">
                  {photosToAvoid.map((tip) => (
                    <article key={tip.title} className="flex gap-2.5">
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-sub-color-300"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="text-sm font-black text-slate-950">
                          {tip.title}
                        </h3>
                        <p className="mt-0.5 text-sm leading-5 text-slate-500">
                          {tip.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
