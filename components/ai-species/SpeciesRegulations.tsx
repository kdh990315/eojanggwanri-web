import type { AiSpeciesRegulation } from "@/lib/ai-species";

const getRegulationLabel = (kind: AiSpeciesRegulation["regulationKind"]) => {
  switch (kind) {
    case "closed_season":
      return "금어기";
    case "minimum_length":
      return "금지체장";
    case "minimum_weight":
      return "금지체중";
    case "prohibited_length_range":
      return "포획 금지 체장";
  }
};

const formatRegulation = (regulation: AiSpeciesRegulation) => {
  switch (regulation.regulationKind) {
    case "closed_season":
      return `${regulation.periodStartMonth}월 ${regulation.periodStartDay}일~${regulation.periodEndMonth}월 ${regulation.periodEndDay}일`;
    case "minimum_length":
      return `${regulation.measurementBasis ?? "길이"} ${regulation.minLengthCm}cm 이하`;
    case "minimum_weight":
      return `${regulation.minWeightG}g 이하`;
    case "prohibited_length_range":
      return `${regulation.prohibitedLengthMinCm}~${regulation.prohibitedLengthMaxCm}cm`;
  }
};

export const SpeciesRegulations = ({
  regulations,
  speciesName,
}: {
  regulations: AiSpeciesRegulation[];
  speciesName: string;
}) => {
  const source = regulations[0];
  const effectiveYear = source.effectiveFrom.slice(0, 4);

  return (
    <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black text-amber-700">포획 규정 확인</p>
          <h3 className="mt-1 text-lg font-black text-slate-950">
            {speciesName}에 적용되는 포획 규정이 있어요
          </h3>
        </div>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">
          {effectiveYear}년 기준
        </span>
      </div>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {regulations.map((regulation, index) => (
          <div
            key={`${regulation.regulationKind}-${index}`}
            className="rounded-xl bg-white p-4"
          >
            <dt className="text-xs font-bold text-slate-500">
              {getRegulationLabel(regulation.regulationKind)}
            </dt>
            <dd className="mt-1 text-lg font-black text-slate-950">
              {formatRegulation(regulation)}
            </dd>
            {regulation.regionNote || regulation.exceptionNote ? (
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {[regulation.regionNote, regulation.exceptionNote]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            ) : null}
          </div>
        ))}
      </dl>

      <p className="mt-4 text-xs leading-5 text-amber-900/70">
        지역과 어업 방식에 따라 규정이 다를 수 있습니다. 방류 전 최신 공식 기준과
        예외 사항을 다시 확인해 주세요.
      </p>
      <a
        href={source.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-xs font-bold text-amber-900/60 underline underline-offset-2"
      >
        출처: {source.sourceTitle}
      </a>
    </section>
  );
};
