import type { Metadata } from "next";
import { Toaster } from "sonner";

import "./globals.css";

const siteUrl = "https://eojanggwanri-web.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "어장관리 | AI 어종 판별과 조과 기록 낚시 노트",
    template: "%s | 어장관리",
  },
  description:
    "어장관리는 물고기 사진으로 AI 어종 후보를 확인하고 날짜, 위치, 물때, 날씨와 함께 내 조과를 기록하는 낚시 노트 앱입니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "어장관리",
    title: "어장관리 | AI 어종 판별과 조과 기록 낚시 노트",
    description:
      "물고기 사진으로 AI 어종 후보를 확인하고 날짜, 위치, 물때, 날씨와 함께 내 조과를 기록하세요.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Toaster richColors position="bottom-center" />
      </body>
    </html>
  );
}
