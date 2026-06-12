import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative h-screen h-dvh overflow-hidden text-[#191f28]">
      <div className="absolute inset-0">
        <Image
          src="/images/main-hero-image.png"
          alt="낚시 위치와 조과 기록을 표현한 어장관리 히어로 이미지"
          priority
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-full w-full max-w-6xl flex-col items-center justify-center px-5 pb-[18vh] text-center sm:pb-[20vh] lg:pb-[22vh]">
        <div>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl lg:mx-0">
            사진 한 장으로
            <br />
            조과를 기록하세요
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-slate-600 md:mt-7 md:text-lg md:leading-8 lg:mx-0">
            사진, 어종 데이터, 조과 기록을 한 번에.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-9">
            <a
              href="#features"
              className="inline-flex h-12 w-full items-center justify-center rounded-md bg-white/82 px-7 text-base font-black text-[#191f28] ring-1 ring-slate-200 transition hover:bg-white md:h-14 sm:w-auto"
            >
              조과 기록 앱 알아보기
            </a>
          </div>
          <div
            className="mt-4 flex items-center justify-center gap-2.5 md:mt-5 md:gap-3"
            aria-label="어장관리 앱 지원 스토어"
          >
            <Image
              src="/images/google-play-badge.png"
              alt="Google Play에서 이용 가능"
              width={566}
              height={169}
              sizes="(min-width: 768px) 158px, 136px"
              className="h-auto w-[136px] drop-shadow-sm md:w-[158px]"
            />
            <Image
              src="/images/app-store-badge.png"
              alt="App Store에서 이용 가능"
              width={566}
              height={169}
              sizes="(min-width: 768px) 158px, 136px"
              className="h-auto w-[136px] drop-shadow-sm md:w-[158px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
