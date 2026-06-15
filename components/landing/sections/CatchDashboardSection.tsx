import { MainTitle } from "@/components/landing/MainTitle";
import { ProductScreen } from "@/components/landing/ProductScreen";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { SubTitle } from "@/components/landing/SubTitle";

export const CatchDashboardSection = () => {
  return (
    <section
      id="features"
      className="bg-white px-5 py-20 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="text-center lg:text-left">
            <SectionLabel className="text-sub-color-100">
              조과 모아보기
            </SectionLabel>
            <MainTitle>
              잡은 순간부터
              <br />
              다시 찾는 날까지
            </MainTitle>
            <SubTitle>
              최근 조과, 상세 기록, 내가 잡은 어종을 한곳에 모아봅니다. 조과가
              쌓일수록 나만의 낚시 노트가 더 선명해집니다.
            </SubTitle>
          </div>
          <ProductScreen
            src="/images/dashboard-store-image.png"
            alt="물때와 월별 조과 통계를 보여주는 어장관리 앱 대시보드"
          />
        </div>
      </div>
    </section>
  );
};
