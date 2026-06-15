"use client";

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";

import { SpeciesRegulations } from "@/components/ai-species/SpeciesRegulations";
import {
  AI_SPECIES_MAX_IMAGE_BYTES,
  isSupportedAiSpeciesImageType,
  type AiSpeciesCandidate,
  type AiSpeciesDetectionResponse,
  type AiSpeciesRegulation,
} from "@/lib/ai-species";

const ACCEPTED_IMAGE_TYPES = "image/jpeg,image/png,image/webp";

export const SpeciesUploadCard = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const analysisIdRef = useRef(0);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [candidates, setCandidates] = useState<AiSpeciesCandidate[]>([]);
  const [regulations, setRegulations] = useState<AiSpeciesRegulation[]>([]);

  useEffect(() => {
    if (!image) {
      setPreviewUrl("");
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(image);
    setPreviewUrl(nextPreviewUrl);

    return () => URL.revokeObjectURL(nextPreviewUrl);
  }, [image]);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const selectImage = (file: File | undefined) => {
    setError("");

    if (!file) {
      return;
    }

    if (!isSupportedAiSpeciesImageType(file.type)) {
      setError("JPG, PNG, WebP 형식의 사진만 사용할 수 있습니다.");
      return;
    }

    if (file.size === 0 || file.size > AI_SPECIES_MAX_IMAGE_BYTES) {
      setError("사진은 8MB 이하로 올려 주세요.");
      return;
    }

    setImage(file);
    analysisIdRef.current += 1;
    setCandidates([]);
    setIsAnalyzing(false);
    setRegulations([]);
    setShowResult(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    selectImage(event.target.files?.[0]);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    selectImage(event.dataTransfer.files?.[0]);
  };

  const clearImage = () => {
    analysisIdRef.current += 1;
    setImage(null);
    setCandidates([]);
    setError("");
    setIsAnalyzing(false);
    setRegulations([]);
    setShowResult(false);
  };

  const analyzeImage = async () => {
    if (!image || isAnalyzing) {
      return;
    }

    setError("");
    setIsAnalyzing(true);
    const analysisId = analysisIdRef.current + 1;
    analysisIdRef.current = analysisId;

    try {
      const formData = new FormData();
      formData.set("image", image);

      const response = await fetch("/api/ai-species", {
        body: formData,
        method: "POST",
      });
      const data = (await response.json()) as
        | AiSpeciesDetectionResponse
        | { message?: string };

      if (!response.ok || !("candidates" in data)) {
        throw new Error(
          "message" in data && data.message
            ? data.message
            : "AI 어종 판별을 시작하지 못했습니다.",
        );
      }

      if (analysisId === analysisIdRef.current) {
        setCandidates(data.candidates);
        setRegulations(data.regulations);
        setShowResult(true);
      }
    } catch (requestError) {
      if (analysisId === analysisIdRef.current) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "AI 어종 판별 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        );
      }
    } finally {
      if (analysisId === analysisIdRef.current) {
        setIsAnalyzing(false);
      }
    }
  };

  const primaryCandidate = candidates[0];

  return (
    <section
      aria-labelledby="upload-title"
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,99,150,0.10)] sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-main-color-100">
            {showResult ? "판별 완료" : "사진 업로드"}
          </p>
          <h1
            id="upload-title"
            className="mt-2 text-2xl font-black leading-tight text-slate-950 sm:text-3xl"
          >
            {showResult
              ? "AI가 제안한 어종 후보를 확인해 주세요"
              : "물고기가 잘 보이는 사진을 골라 주세요"}
          </h1>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES}
        onChange={handleInputChange}
        className="sr-only"
        aria-label="물고기 사진 선택"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleInputChange}
        className="sr-only"
        aria-label="물고기 사진 촬영"
      />

      {image && previewUrl && showResult && primaryCandidate ? (
        <div className="mt-6">
          <div className="grid gap-4 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-center">
            <img
              src={previewUrl}
              alt="AI 어종 판별에 사용한 물고기 사진"
              className="aspect-[4/3] w-full rounded-2xl bg-slate-100 object-contain sm:aspect-square"
            />
            <div>
              <p className="text-sm font-black text-main-color-100">
                판별 결과
              </p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">
                가장 유사한 후보는 {primaryCandidate.speciesName}예요
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                AI가 사진의 형태와 무늬를 비교해 제안한 참고용 후보입니다.
                최종 어종은 직접 특징을 확인해 주세요.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-main-color-400 bg-main-color-600 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black text-main-color-100">
                  가장 유사한 후보
                </p>
                <h3 className="mt-1 text-2xl font-black text-slate-950">
                  {primaryCandidate.speciesName}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-500">참고 일치도</p>
                <p className="mt-1 text-xl font-black text-main-color-100">
                  {primaryCandidate.confidence}%
                </p>
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-main-color-300"
                style={{ width: `${primaryCandidate.confidence}%` }}
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {primaryCandidate.reason}
            </p>
          </div>

          {regulations.length ? (
            <SpeciesRegulations
              regulations={regulations}
              speciesName={primaryCandidate.speciesName}
            />
          ) : null}

          {candidates.length > 1 ? (
            <div className="mt-6">
              <h3 className="text-base font-black text-slate-950">
                함께 확인할 후보
              </h3>
              <div className="mt-3 grid gap-3">
                {candidates.slice(1).map((candidate) => (
                  <article
                    key={candidate.speciesName}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="font-black text-slate-950">
                        {candidate.speciesName}
                      </h4>
                      <p className="text-sm font-black text-slate-500">
                        참고 {candidate.confidence}%
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {candidate.reason}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          <button
            type="button"
            onClick={clearImage}
            className="mt-6 inline-flex h-14 w-full items-center justify-center rounded-md bg-main-color-100 px-6 text-base font-black text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            다른 사진으로 다시 판별
          </button>
        </div>
      ) : image && previewUrl ? (
        <div className="mt-6">
          <div className="relative overflow-hidden rounded-2xl bg-slate-100">
            <img
              src={previewUrl}
              alt="AI 어종 판별을 위해 선택한 물고기 사진"
              className="aspect-[4/3] w-full object-contain"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-slate-950/80 to-transparent px-4 pb-4 pt-12 text-white">
              <div className="min-w-0">
                <p className="text-sm font-bold">사진 선택 완료</p>
                <p className="mt-1 truncate text-xs text-white/70">
                  {image.name}
                </p>
              </div>
              <button
                type="button"
                onClick={openFilePicker}
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-white/15 px-3 text-sm font-bold backdrop-blur transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                변경
              </button>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-main-color-600 p-4 sm:p-5">
            <p className="text-sm font-black text-main-color-100">
              사진이 준비되었습니다
            </p>
            <p className="mt-1.5 text-sm leading-6 text-slate-600">
              판별을 시작하면 사진을 저장하지 않고 AI가 등록된 어종 데이터를
              기준으로 후보를 제안합니다.
            </p>
          </div>

          <button
            type="button"
            onClick={analyzeImage}
            disabled={isAnalyzing}
            className="mt-4 inline-flex h-14 w-full items-center justify-center rounded-md bg-main-color-100 px-6 text-base font-black text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
          >
            {isAnalyzing ? "AI가 어종 후보를 분석하고 있습니다" : "AI 어종 판별 시작"}
          </button>
          <button
            type="button"
            onClick={clearImage}
            className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-md text-sm font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            선택한 사진 지우기
          </button>
        </div>
      ) : (
        <div
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className={`mt-6 flex min-h-80 flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-12 text-center transition ${
            isDragging
              ? "border-main-color-300 bg-main-color-600"
              : "border-slate-200 bg-slate-50/70"
          }`}
        >
          <p className="text-lg font-black text-slate-900">
            사진을 이곳에 끌어다 놓으세요
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            JPG, PNG, WebP · 최대 8MB
          </p>
          <div className="mt-6 grid w-full grid-cols-2 gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="inline-flex h-14 items-center justify-center rounded-md bg-main-color-100 px-4 text-sm font-black text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              사진 촬영
            </button>
            <button
              type="button"
              onClick={openFilePicker}
              className="inline-flex h-14 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-sm font-black text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              앨범에서 선택
            </button>
          </div>
          <button
            type="button"
            onClick={openFilePicker}
            className="mt-6 hidden h-14 items-center justify-center rounded-md bg-main-color-100 px-7 text-base font-black text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:inline-flex"
          >
            사진 업로드
          </button>
        </div>
      )}

      {error ? (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
        >
          {error}
        </p>
      ) : null}

    </section>
  );
};
