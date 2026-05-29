import { AiIntroSection } from "@/components/landing/ai-intro-section";
import { CatchRecordSection } from "@/components/landing/catch-record-section";
import { DownloadSection } from "@/components/landing/download-section";
import { FaqPreviewSection } from "@/components/landing/faq-preview-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { FinalCtaSection } from "@/components/landing/final-cta-section";
import { FishLinksSection } from "@/components/landing/fish-links-section";
import { HeroSection } from "@/components/landing/hero-section";
import { MobileStickyCta } from "@/components/landing/mobile-sticky-cta";
import { seoStructuredData } from "@/components/landing/content";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <AiIntroSection />
        <CatchRecordSection />
        <FeaturesSection />
        <DownloadSection />
        <FishLinksSection />
        <FaqPreviewSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
      <MobileStickyCta />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoStructuredData) }}
      />
    </>
  );
}
