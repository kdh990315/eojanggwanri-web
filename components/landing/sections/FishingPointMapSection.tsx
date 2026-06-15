import { MainTitle } from "@/components/landing/MainTitle";
import { ProductScreen } from "@/components/landing/ProductScreen";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { SubTitle } from "@/components/landing/SubTitle";

export function FishingPointMapSection() {
  return (
    <section id="point-map" className="bg-white px-5 py-20 md:py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 md:gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="text-center lg:text-left">
          <SectionLabel className="text-sub-color-300">
            포인트 지도
          </SectionLabel>
          <MainTitle>
            조과 기록 후 자동 등록되는
            <br />
            나만의 포인트 지도
          </MainTitle>

          <SubTitle>
            조과를 저장하면 포인트가 기록과 함께 자동으로 정리됩니다. 다음 출조
            때 지난 위치와 조건을 다시 확인하며 내 낚시 패턴을 이어갈 수
            있습니다.
          </SubTitle>
        </div>
        <ProductScreen
          src="/images/point-store-image.png"
          alt="조과 기록이 자동으로 정리된 어장관리 나만의 포인트 지도"
        />
      </div>
    </section>
  );
}
