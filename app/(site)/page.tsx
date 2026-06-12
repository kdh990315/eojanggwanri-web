import { AiSpeciesSection } from "@/components/landing/sections/AiSpeciesSection";
import { CatchDashboardSection } from "@/components/landing/sections/CatchDashboardSection";
import { CatchRegistrationSection } from "@/components/landing/sections/CatchRegistrationSection";
import { FAQSection } from "@/components/landing/sections/FAQSection";
import { FishingPointMapSection } from "@/components/landing/sections/FishingPointMapSection";
import { HeroSection } from "@/components/landing/sections/HeroSection";

const seoStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "어장관리",
  description:
    "물고기 사진으로 AI 어종 후보를 확인하고 날짜, 위치, 물때, 날씨와 함께 조과를 기록하는 낚시 노트 앱 소개 페이지입니다.",
  inLanguage: "ko-KR",
  url: "https://eojanggwanri-web.vercel.app/",
};

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-white text-[#191f28]">
        <HeroSection />
        <CatchDashboardSection />
        <CatchRegistrationSection />
        <FishingPointMapSection />
        <AiSpeciesSection />
        <FAQSection />
      </main>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoStructuredData) }}
      />
    </>
  );
}
