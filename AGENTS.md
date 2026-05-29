# Agent Guide

## Project

- 이 프로젝트는 `어장관리` 랜딩/AI 어종 판별 웹사이트다.
- 핵심 흐름은 검색 유입 -> 물고기 사진 업로드 -> 영상 광고 시청 또는 skip -> AI 어종 후보 확인 -> 조과 기록 앱 가치 이해다.
- Next.js App Router 기준으로 구현한다.
- 화면 문구, SEO title, SEO description, 본문은 한국어를 사용한다.
- URL slug는 영어를 사용한다.

## Source Documents

- 제품 목적과 확정된 결정: `docs/product.md`
- 디자인과 UX 방향: `docs/design.md`
- 라우트, 페이지 구성, SEO: `docs/routes-seo.md`
- AI 어종 판별 흐름: `docs/ai-species.md`
- 광고, 개인정보, 보안, 금지 표현: `docs/ads-privacy-security.md`
- 남은 미결정 사항: `docs/open-questions.md`

## Non-Negotiables

- 메인 CTA `AI 어종 판별하기`는 `/ai-species`로 이동해야 한다.
- `/`는 앱 소개와 진입 페이지다. 전체 AI 판별 UI를 `/`에 구현하지 않는다.
- AI 결과는 확정값이 아니라 후보/참고 정보로 표현한다.
- 100% 정확도, 자동 확정, 조과 보장, 광고 클릭 유도처럼 보이는 표현을 쓰지 않는다.
- Gemini API key, Supabase service role key, 광고 서버 secret은 웹 클라이언트에 노출하지 않는다.
- AI 어종 판별은 기존 Supabase Edge Function을 재사용한다.
- 웹 AI 어종 판별은 로그인 없이 사용할 수 있다.
- 비로그인 사용자의 판별 사진은 저장하거나 보관하지 않는다.
- 광고는 보상형 광고가 아니다. 이미지 업로드 후 영상 광고를 노출하고, 사용자가 skip하거나 광고 시간이 끝나면 AI 판별을 시작한다.
- 앱 다운로드 링크는 소개페이지에서만 노출한다.
- 어종 생태, 금어기, 금지체장 정보는 Supabase DB 데이터를 사용한다.
- 구현 전 `docs/open-questions.md`를 확인한다.
