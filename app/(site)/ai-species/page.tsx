import type { Metadata } from "next";

import { SpeciesTip } from "@/components/ai-species/SpeciesTip";
import { SpeciesUploadCard } from "@/components/ai-species/SpeciesUploadCard";

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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI 어종 판별",
  description:
    "물고기 사진을 업로드하고 AI가 제안하는 어종 후보를 참고하는 페이지입니다.",
  inLanguage: "ko-KR",
  url: "https://eojanggwanri-web.vercel.app/ai-species",
};

const AiSpeciesPage = () => {
  return (
    <>
      <main className="min-h-screen bg-[linear-gradient(180deg,#f7fbfd_0%,#ffffff_38%,#f7f9fb_100%)] px-5 pb-24 pt-28 text-[#191f28] md:pb-32 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:items-start">
            <SpeciesUploadCard />
            <SpeciesTip />
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
};

export default AiSpeciesPage;
