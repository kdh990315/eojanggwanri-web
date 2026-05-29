# Routes and SEO

## Route Map

```text
/
/ai-species
/fish/rockfish
/fish/flounder
/fish/yellow-croaker
/fish/wrasse
/faq
```

## Route Principles

- `/` is the app introduction page and main CTA hub.
- `/ai-species` is the actual AI species identification experience.
- `/fish/*` pages receive species-specific search traffic and lead users to AI identification.
- `/faq` answers policy-sensitive questions about AI accuracy, photo handling, ads, and app records.
- Top navigation and primary CTA must make `/ai-species` easy to reach.

## `/`

Role:

- 어장관리 앱 소개 메인
- AI 어종 판별 체험 진입
- 조과 기록 앱 가치 설명

Keywords:

- `어장관리`
- `조과 기록`
- `낚시 노트`
- `AI 어종 판별`
- `낚시 기록 앱`

Recommended title:

```text
어장관리 | AI 어종 판별과 조과 기록 낚시 노트
```

Recommended description:

```text
어장관리는 물고기 사진으로 AI 어종 후보를 확인하고 날짜, 위치, 물때, 날씨와 함께 내 조과를 기록하는 낚시 노트 앱입니다.
```

H1:

```text
사진으로 물고기 이름을 찾고, 내 조과를 낚시 노트로 남기세요.
```

Required sections:

- Hero
- AI 어종 판별 소개
- 조과 기록 가치
- 앱 기능 요약
- 자주 찾는 어종 링크
- FAQ 요약
- 하단 CTA

CTA:

- `AI 어종 판별하기` -> `/ai-species`
- `조과 기록 앱 알아보기` -> 앱 소개 또는 조과 기록 섹션

Support links:

- `문의 · 오류 제보 · 아이디어 제안` -> `https://docs.google.com/forms/d/e/1FAIpQLSexQf4Mtne8w5iEjDjW-06VGYFV1cdGLUDX8Q_8gT6kLvRCfQ/viewform?usp=dialog`
- GitHub 링크는 소개페이지에 노출하지 않는다.
- 문의 링크는 Footer 또는 FAQ 요약 섹션에 보조 링크로 노출한다.
- 문의 링크는 새 탭으로 열고, 메인 CTA와 경쟁하지 않게 시각적으로 약하게 처리한다.

## `/ai-species`

Role:

- 실제 AI 어종 판별 체험
- 검색 사용자의 즉시 문제 해결
- 앱 조과 기록 흐름으로 연결

Keywords:

- `어종판별`
- `어종 사진`
- `AI 어종 판별`
- `물고기 사진 이름 찾기`
- `사진으로 물고기 찾기`

Recommended title:

```text
AI 어종 판별 | 사진으로 물고기 이름 찾기
```

Recommended description:

```text
물고기 사진을 업로드하면 AI가 어종 후보를 제안합니다. 판별 결과를 확인하고 어장관리 앱에서 조과 기록으로 남겨 보세요.
```

H1:

```text
AI 어종 판별
```

## `/fish/*`

Common requirements:

- 대표 이미지 또는 예시 이미지를 보여준다.
- AI 판별 CTA를 제공한다.
- 해당 어종을 조과 기록에 남길 수 있는 항목을 안내한다.
- 유사 어종과 혼동 가능성을 안내한다.
- 생태, 금어기, 금지체장 정보는 Supabase DB 데이터를 사용한다.
- 확인되지 않은 어종 정보는 단정하지 않는다.

| Route | Fish | Keywords | Recommended title | Recommended description | H1 |
| --- | --- | --- | --- | --- | --- |
| `/fish/rockfish` | 우럭 | `우럭 사진`, `우럭 어종판별`, `우럭 조과` | `우럭 사진과 AI 어종판별 \| 어장관리` | `우럭으로 보이는 물고기 사진을 AI 어종 판별로 확인하고, 날짜와 위치, 물때를 함께 조과 기록으로 남겨 보세요.` | `우럭 사진으로 어종을 확인해 보세요` |
| `/fish/flounder` | 광어 | `광어 사진`, `광어 어종판별`, `광어 조과` | `광어 사진과 AI 어종판별 \| 어장관리` | `광어로 보이는 물고기 사진을 AI 어종 판별로 확인하고, 잡은 날짜와 위치, 물때, 날씨를 함께 기록해 보세요.` | `광어 사진으로 어종을 확인해 보세요` |
| `/fish/yellow-croaker` | 백조기 | `백조기 사진`, `백조기 어종판별`, `백조기 조과` | `백조기 사진과 AI 어종판별 \| 어장관리` | `백조기로 보이는 물고기 사진을 AI 어종 판별로 확인하고, 조과 사진과 낚시 기록을 어장관리 앱에 남겨 보세요.` | `백조기 사진으로 어종을 확인해 보세요` |
| `/fish/wrasse` | 놀래미 | `놀래미 사진`, `놀래미 어종판별`, `놀래미 조과` | `놀래미 사진과 AI 어종판별 \| 어장관리` | `놀래미로 보이는 물고기 사진을 AI 어종 판별로 확인하고, 잡은 위치와 날짜, 물때를 조과 기록으로 정리해 보세요.` | `놀래미 사진으로 어종을 확인해 보세요` |

## `/faq`

Role:

- AI 판별과 앱 기록 흐름에서 사용자의 불안을 줄인다.
- 광고, 정확도, 사진 처리 안내를 명확히 한다.

Keywords:

- `AI 어종 판별 정확도`
- `물고기 사진 업로드`
- `낚시 기록 앱`
- `조과 기록 앱`

Recommended title:

```text
FAQ | AI 어종 판별과 조과 기록 안내
```

Recommended description:

```text
AI 어종 판별 정확도, 사진 업로드, 광고 시청, 조과 기록 앱 사용에 대한 자주 묻는 질문을 확인하세요.
```

H1:

```text
자주 묻는 질문
```

Required FAQ:

```text
AI 어종 판별은 얼마나 정확한가요?
사진은 어디에 저장되나요?
광고는 언제 나오나요?
광고를 skip하면 어떻게 되나요?
판별 결과를 조과 기록에 저장할 수 있나요?
어장관리 앱 없이 웹에서만 사용할 수 있나요?
잘못 판별된 결과는 수정할 수 있나요?
```

Answer rules:

- AI 판별은 참고용이며 사진 품질과 어종에 따라 달라질 수 있다고 설명한다.
- 비로그인 판별 사진은 저장하거나 보관하지 않는다고 설명한다.
- 이미지 업로드 후 영상 광고가 노출된다고 설명한다.
- 사용자가 광고를 skip하거나 광고 시간이 끝나면 AI 판별이 시작된다고 설명한다.
- 판별 결과는 사용자가 확인하고 수정할 수 있다고 설명한다.

## SEO Requirements

- Do not list keywords unnaturally.
- Distribute keywords naturally across title, description, H1, body, FAQ, image alt, Open Graph, and JSON-LD.
- Each page should focus on one search intent.
- Do not repeat the same sentence across many pages.
- Do not exaggerate AI accuracy or fish facts.
- Define `metadata.title` and `metadata.description` for each page.
- Define canonical URL, Open Graph title, Open Graph description, and Open Graph image.
- Use exactly one H1 per page.
- Use concrete image alt text.
- Use FAQPage JSON-LD for `/faq`.
- Prefer WebPage or Article JSON-LD for `/fish/*`.
- If app download links are ready on the introduction page, consider SoftwareApplication JSON-LD.
- JSON-LD content must match visible page content.

## Image Alt Examples

Good:

- `우럭으로 보이는 바다 물고기 조과 사진`
- `AI 어종 판별 결과 후보가 표시된 어장관리 화면`

Avoid:

- `fish`
- `어종판별 AI 조과 기록 낚시 앱 물고기 사진`
