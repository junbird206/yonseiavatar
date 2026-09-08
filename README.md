# 연세대 2학기 생존 독수리 유형 테스트

연세대학교 재학생 타깃의 모바일 퍼스트 정적 심리테스트 웹앱입니다. 8문항 응답 후 6가지 독수리 유형 중 하나를 보여주고, 결과 이미지를 인스타그램 스토리 비율로 저장할 수 있습니다.

## Scripts

```sh
npm run dev
npm test
npm run build
```

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`

## Launch Placeholders

- `src/data.js`의 `PROMOTION_LINKS`를 실제 가입 링크 조합으로 교체
- `src/data.js`의 `TEST_PUBLIC_URL`을 실제 공개 주소로 교체
- `index.html`의 GA4 측정 ID `G-XXXXXXXXXX`를 실제 ID로 교체
