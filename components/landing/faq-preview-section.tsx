import Link from "next/link";
import { MessageSquare } from "lucide-react";

import { contactFormUrl, faqPreview } from "@/components/landing/content";
import { Button } from "@/components/ui/button";

export function FaqPreviewSection() {
  return (
    <section id="faq" className="border-b bg-secondary py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold text-primary">FAQ</p>
            <h2 className="text-3xl font-bold tracking-normal sm:text-4xl">
              처음 사용하기 전에 궁금한 점
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/faq">전체 FAQ 보기</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {faqPreview.map((item) => (
            <article key={item.question} className="rounded-lg border bg-white p-6">
              <h3 className="font-bold leading-6">{item.question}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {item.answer}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-lg border bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <MessageSquare className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold">궁금한 점이나 오류가 있나요?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                문의, 오류 제보, 아이디어 제안을 Google Form으로 받고 있습니다.
              </p>
            </div>
          </div>
          <Button asChild variant="secondary">
            <a href={contactFormUrl} target="_blank" rel="noreferrer">
              문의하기
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
