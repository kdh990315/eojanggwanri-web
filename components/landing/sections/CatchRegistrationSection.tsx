import { MainTitle } from "@/components/landing/MainTitle";
import { ProductScreen } from "@/components/landing/ProductScreen";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { SubTitle } from "@/components/landing/SubTitle";

export const CatchRegistrationSection = () => {
  return (
    <section
      id="record"
      className="bg-[#f7f9fb] px-5 py-20 md:py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <ProductScreen
          src="/images/register-store-image.png"
          alt="사진과 환경 정보, 포인트 정보를 함께 남기는 어장관리 조과 등록 화면"
          className="order-2 lg:order-1"
        />
        <div className="order-1 text-center lg:order-2 lg:text-left">
          <SectionLabel className="text-sub-color-100">조과 기록</SectionLabel>
          <MainTitle>
            낚시의 순간을
            <br />
            흐려지지 않는 기록으로
          </MainTitle>
          <SubTitle>
            사진 한 장에 날짜, 위치, 물때, 날씨를 함께 남겨두세요. 시간이 지나도
            어디서 어떤 조건에 잡았는지 쉽게 다시 볼 수 있습니다.
          </SubTitle>
        </div>
      </div>
    </section>
  );
};
