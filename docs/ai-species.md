# AI 어종 판별

## 원칙

- 웹 단순 AI 어종 판별은 로그인 없이 사용할 수 있다.
- 웹 단순 판별 사진과 판별 결과는 Storage 및 DB에 저장하지 않는다.
- 기존 모바일 앱 판별과 사진 조과 초안은 로그인 사용자의 Storage 사진 경로를 사용한다.
- 로그인 사용자가 최종 조과 등록을 확정할 때만 사진을 Storage에 업로드하고 조과 기록에 연결한다.
- AI 결과는 확정값이 아니라 참고용 후보로 표시한다.

## 단순 AI 어종 판별

Edge Function: `detect-fish-species-web`

인증:

- 사용자 로그인 불필요
- 공개 요청은 Edge Function에서 IP 해시 기반 요청 제한 적용

요청:

```json
{
  "imageBase64": "<base64>",
  "mimeType": "image/jpeg",
  "waterType": "saltwater"
}
```

- 지원 형식: JPG, PNG, WebP
- 최대 이미지 크기: 8MB
- `waterType`: `saltwater`, `freshwater`, 또는 생략

응답:

```json
{
  "candidates": [
    {
      "confidence": 72,
      "reason": "사진에서 확인되는 특징을 기준으로 판별했습니다.",
      "speciesId": 3,
      "speciesName": "광어"
    }
  ],
  "model": "gemini-2.5-flash"
}
```

## 모바일 앱 AI 어종 판별

Edge Function: `detect-fish-species`

인증:

- Supabase 로그인 필요
- 요청 사용자가 소유한 `catch-images/users/{userId}/...` 경로만 허용

요청:

```json
{
  "imagePath": "users/{userId}/ai-species/photo.jpeg",
  "waterType": "saltwater"
}
```

함수는 Storage 사진을 판별하고 `ai_species_predictions`에 결과를 저장한 뒤
`imagePath`, `predictionId`, 후보 목록을 반환한다.

## 사진으로 조과 등록 초안

Edge Function: `create-photo-catch-draft`

인증:

- Supabase 로그인 필요
- 기존 모바일 앱의 Storage 사진 경로와 판별 기록을 사용

요청:

```json
{
  "capturedAt": "2026-06-15T10:00:00+09:00",
  "capturedAtSource": "photo_exif",
  "imagePath": "users/{userId}/photo-catch-drafts/photo.jpeg",
  "latitude": 35.1,
  "locationSource": "photo_exif",
  "longitude": 129.1,
  "waterType": "saltwater"
}
```

응답에는 `imagePath`, `predictionId`와 자동 완성된 조과 초안 정보가 포함된다.

## 최종 조과 등록

사용자가 조과 등록을 확정하면 클라이언트가 다음 순서로 저장한다.

1. 사진을 `catch-images/users/{userId}/...` 경로에 업로드한다.
2. 조과 기록을 저장한다.
3. `catch_images`에 Storage 경로를 조과 기록과 연결한다.

초안 생성 또는 단순 판별을 취소한 사진은 Storage에 남지 않는다.
