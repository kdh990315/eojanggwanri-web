"use client";

import { Play, QrCode, Smartphone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const preparingMessage = "앱 다운로드는 준비 중입니다.";

export function DownloadSection() {
  const notifyPreparing = () => {
    toast.info(preparingMessage, {
      description: "스토어 링크와 QR 코드가 준비되면 바로 연결됩니다.",
    });
  };

  return (
    <section id="download" className="border-b bg-secondary py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1fr_360px] lg:px-8">
        <div>
          <p className="mb-3 text-sm font-semibold text-primary">앱 다운로드</p>
          <h2 className="text-3xl font-bold tracking-normal sm:text-4xl">
            조과 기록은 앱에서 더 편하게 이어갑니다.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            AI로 확인한 어종 후보를 참고하고, 날짜와 위치, 물때, 날씨를
            함께 남기는 낚시 노트를 준비하고 있습니다.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button type="button" size="lg" onClick={notifyPreparing}>
              <Smartphone className="size-4" />
              iOS 다운로드
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={notifyPreparing}
            >
              <Play className="size-4" />
              Android 다운로드
            </Button>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            현재 버튼과 QR은 더미 상태입니다. 실제 스토어 링크가 준비되면
            같은 위치에서 교체합니다.
          </p>
        </div>

        <button
          type="button"
          onClick={notifyPreparing}
          className="group rounded-lg border bg-white p-5 text-left shadow-sm transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="앱 다운로드 QR 코드 준비 안내"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">QR 코드</p>
              <p className="text-xs text-muted-foreground">준비 중</p>
            </div>
            <QrCode className="size-5 text-primary" />
          </div>
          <div className="mt-5 aspect-square rounded-md border border-dashed bg-[repeating-linear-gradient(45deg,#f8fafc_0,#f8fafc_10px,#ffffff_10px,#ffffff_20px)] p-5">
            <div className="grid h-full grid-cols-5 gap-2">
              {Array.from({ length: 25 }).map((_, index) => (
                <span
                  key={index}
                  className={
                    index % 2 === 0 || index % 7 === 0
                      ? "rounded-sm bg-slate-900"
                      : "rounded-sm bg-slate-200"
                  }
                />
              ))}
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground group-hover:text-foreground">
            클릭하면 준비 안내가 표시됩니다.
          </p>
        </button>
      </div>
    </section>
  );
}
