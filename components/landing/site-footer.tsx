import { contactFormUrl } from "@/components/landing/content";

export function SiteFooter() {
  return (
    <footer className="border-t bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>
          <span className="font-semibold text-foreground">어장관리</span>
          <span className="ml-2">AI 어종 판별과 조과 기록 낚시 노트</span>
        </p>
        <a
          href={contactFormUrl}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          문의 · 오류 제보 · 아이디어 제안
        </a>
      </div>
    </footer>
  );
}
