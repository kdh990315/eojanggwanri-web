import {
  BookOpen,
  Camera,
  CloudSun,
  Fish,
  ListChecks,
  MapPin,
  PlayCircle,
  Search,
  Sparkles,
  Upload,
} from "lucide-react";

export const contactFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSexQf4Mtne8w5iEjDjW-06VGYFV1cdGLUDX8Q_8gT6kLvRCfQ/viewform?usp=dialog";

export const navigationItems = [
  { label: "조과 기록", href: "#catch-record" },
  { label: "앱 소개", href: "#features" },
  { label: "AI 어종판별", href: "#ai-species-intro" },
  { label: "FAQ", href: "#faq" },
];

export const aiSteps = [
  {
    icon: Upload,
    title: "전용 페이지에서 사진 업로드",
    description: "소개 페이지가 아니라 AI 어종 판별 페이지에서 사진을 선택합니다.",
  },
  {
    icon: PlayCircle,
    title: "짧은 광고 후 판별",
    description: "영상 광고가 끝나거나 skip하면 AI 판별을 시작합니다.",
  },
  {
    icon: Sparkles,
    title: "AI 후보 확인",
    description: "결과는 확정값이 아니라 직접 확인해야 할 후보입니다.",
  },
];

export const featureItems = [
  {
    icon: Camera,
    title: "사진으로 조과 등록",
    description: "잡은 물고기 사진을 중심으로 조과를 남깁니다.",
  },
  {
    icon: ListChecks,
    title: "직접 입력 기록",
    description: "어종, 마릿수, 메모를 직접 입력해 기록을 보완합니다.",
  },
  {
    icon: Fish,
    title: "AI 어종 판별",
    description: "사진을 바탕으로 어종 후보를 참고용으로 확인합니다.",
  },
  {
    icon: CloudSun,
    title: "물때와 날씨",
    description: "날짜, 위치, 물때, 날씨를 함께 정리합니다.",
  },
  {
    icon: MapPin,
    title: "위치 기반 기록",
    description: "어디서 어떤 조과가 있었는지 나중에 다시 확인합니다.",
  },
  {
    icon: BookOpen,
    title: "내 어종 도감",
    description: "내가 잡은 어종을 모아 낚시 기록의 흐름을 봅니다.",
  },
];

export const fishLinks = [
  { label: "우럭", href: "/fish/rockfish" },
  { label: "광어", href: "/fish/flounder" },
  { label: "백조기", href: "/fish/yellow-croaker" },
  { label: "놀래미", href: "/fish/wrasse" },
];

export const faqPreview = [
  {
    question: "AI 어종 판별은 얼마나 정확한가요?",
    answer:
      "사진 품질과 어종 특징에 따라 결과가 달라질 수 있습니다. 판별 결과는 확정값이 아니라 후보와 참고 정보로 확인해 주세요.",
  },
  {
    question: "사진은 어디에 저장되나요?",
    answer:
      "웹에서 로그인 없이 사용하는 판별 사진은 저장하거나 보관하지 않는 것을 기준으로 설계합니다.",
  },
  {
    question: "판별 결과를 조과 기록에 저장할 수 있나요?",
    answer:
      "앱에서는 사용자가 결과를 확인하고 수정한 뒤 조과 기록으로 이어갈 수 있는 흐름을 제공합니다.",
  },
];

export const recordPoints = [
  "잡은 물고기 사진과 이름, 날짜, 위치를 한 기록 안에 남깁니다.",
  "물때와 날씨를 같이 정리해 다음 출조를 돌아볼 수 있습니다.",
  "쌓인 기록은 이후 어종별, 위치별 흐름을 살펴볼 수 있는 기반이 됩니다.",
];

export const seoStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "어장관리 | AI 어종 판별과 조과 기록 낚시 노트",
  description:
    "어장관리는 물고기 사진으로 AI 어종 후보를 확인하고 날짜, 위치, 물때, 날씨와 함께 내 조과를 기록하는 낚시 노트 앱입니다.",
  inLanguage: "ko-KR",
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "어장관리",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android",
    description:
      "AI 어종 판별과 조과 기록을 연결해 낚시 사진, 위치, 날짜, 물때, 날씨를 함께 정리하는 낚시 기록 앱입니다.",
  },
};

export const searchIntentItems = [
  {
    icon: Search,
    title: "메인 페이지는 소개만",
    description: "업로드 UI 없이 어장관리 앱의 기록 가치를 먼저 보여줍니다.",
  },
  {
    icon: Fish,
    title: "분석은 별도 페이지에서",
    description: "`AI 어종 판별하기` 버튼을 눌러 전용 페이지로 이동합니다.",
  },
  {
    icon: BookOpen,
    title: "결과 뒤 앱 가치 소개",
    description: "판별 결과 화면에서 조과 기록 앱의 가치를 다시 안내합니다.",
  },
];
