# Lovv Admin Web

Lovv 관리자 콘솔 UI 목업입니다. 본 서비스 프론트와 분리된 Vite React 앱으로, 현재 범위는 mock data 기반 관리자 화면 구현입니다.

## Scope

- 지역 운영자 지표 조회 UI
- 데이터 제공자 제안 폼 UI
- 관리자 제안 검토 UI
- 승인/반려/수정 요청 상태 UI
- 데이터 반영 및 추천 인덱스 갱신 타임라인 UI

## Out of Scope

- 실제 로그인과 권한 검증
- 실제 API 저장
- 데이터베이스 연결
- RAG 인덱스 실시간 갱신
- 운영자 토큰 또는 서버 비밀값 관리

## Commands

```bash
npm run dev
npm run test
npm run lint
npm run build
```

## Vercel

Import this repository as a separate Vercel Project. The app uses the Vite defaults:

- Build Command: `npm run build`
- Output Directory: `dist`
