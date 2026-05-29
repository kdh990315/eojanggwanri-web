# Ads, Privacy, and Security

## Video Ad Policy

Flow:

```text
사진 선택
  -> 영상 광고 노출
  -> 사용자가 skip하거나 광고 시간이 끝남
  -> AI 어종 판별 시작
```

Principles:

- Do not call this a rewarded ad.
- Show the ad after image upload and before AI identification.
- Start AI identification when the user skips the ad or the ad time ends.
- Do not encourage ad clicks.
- Do not confuse ad watching with ad clicking.
- Do not make ad failure look like an app error.
- Provide alternate guidance when an ad cannot be shown.

Implementation cautions:

- Check the latest official documentation for the selected web ad platform before implementation.
- Distinguish mobile app AdMob policy from web ad policy.
- Do not place misleading ads next to the photo upload button.
- Do not rely only on client state for ad end or skip status; review server verification options.

Recommended wording:

```text
사진을 올리면 짧은 광고 후 AI 어종 판별이 시작됩니다.
```

Avoid:

```text
광고를 클릭하면 판별됩니다.
광고 보상을 받으면 판별됩니다.
광고 시청 없이 불가능합니다.
```

## Security

- Gemini API keys must never be exposed to the web client.
- Supabase service role keys must never be exposed to the web client.
- Ad server secrets must never be exposed to the web client.
- Store Gemini API keys as Supabase Edge Function secrets.
- User personal data must be stored in tables with RLS enabled.
- Storage bucket policies must clearly limit upload, read, and delete permissions.
- Public SEO images and user-uploaded images must use separate storage locations and permissions.
- Privacy policy and photo-processing copy must match the actual implementation.

## Photo Handling

- Web AI identification is available without login.
- For non-logged-in users, identification photos must not be stored or retained.
- If temporary processing is technically required, ensure the implementation removes the photo and does not expose it as stored user content.
- If a logged-in user connects an image to a catch record, verify ownership with Supabase Auth, RLS policy, and Storage object path rules.
- Separate AI identification output from the species finally selected by the user.

## Forbidden Claims

Do not use:

- `100% 정확한 어종 판별`
- `AI가 확정한 어종`
- `사진만 올리면 자동 저장`
- `광고를 클릭하면 판별`
- `광고 보상을 받으면 판별`
- `광고 시청 없이 불가능`
- Any phrase that guarantees catching a specific species

Preferred framing:

- `AI가 어종 후보를 제안합니다.`
- `결과는 참고용이며 직접 확인해 주세요.`
- `사진으로 조과 기록 초안을 만들 수 있습니다.`
- `사진을 올리면 짧은 광고 후 AI 어종 판별이 시작됩니다.`
