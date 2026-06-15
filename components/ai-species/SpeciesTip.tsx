import { photoTips, photosToAvoid } from "@/constants/SPECIES_TIP";

export const SpeciesTip = () => {
  return (
    <section
      aria-labelledby="photo-tip-title"
      className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7"
    >
      <p className="text-sm font-black text-main-color-100">
        판별 사진 촬영 팁
      </p>
      <h2
        id="photo-tip-title"
        className="mt-3 text-xl font-black leading-tight text-slate-950"
      >
        이런 사진일수록 좋아요
      </h2>
      <div className="mt-5 grid gap-3">
        {photoTips.map((tip) => (
          <article key={tip.title} className="flex gap-2.5">
            <span
              className="mt-2 size-1.5 shrink-0 rounded-full bg-main-color-300"
              aria-hidden="true"
            />
            <div>
              <h3 className="text-sm font-black text-slate-950">{tip.title}</h3>
              <p className="mt-0.5 text-sm leading-5 text-slate-500">
                {tip.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-7 border-t border-slate-200 pt-6">
        <h2 className="text-xl font-black leading-tight text-slate-950">
          이런 사진은 피해주세요
        </h2>
        <div className="mt-5 grid gap-3">
          {photosToAvoid.map((tip) => (
            <article key={tip.title} className="flex gap-2.5">
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full bg-sub-color-300"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-sm font-black text-slate-950">{tip.title}</h3>
                <p className="mt-0.5 text-sm leading-5 text-slate-500">
                  {tip.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
