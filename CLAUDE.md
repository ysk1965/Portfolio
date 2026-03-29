@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

개인 포트폴리오 웹사이트 (Next.js + TypeScript)

## Commands

```bash
npm run dev          # 개발 서버 (http://localhost:3000)
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버
npm run lint         # ESLint 실행
```

## Architecture

### 디렉토리 구조
- `app/` - App Router 페이지 및 레이아웃
- `components/` - 재사용 컴포넌트
- `components/ui/` - shadcn/ui 컴포넌트
- `lib/` - 유틸리티 및 헬퍼 함수
- `public/` - 정적 파일 (이미지, 폰트 등)

### 주요 패턴
- App Router 사용 (app/ 디렉토리)
- Server Components 기본, `'use client'` 지시어로 Client Component 전환
- API Routes: `app/api/*/route.ts`

### 스타일링
- Tailwind CSS v4 사용
- shadcn/ui 컴포넌트 라이브러리

### 애니메이션
- Framer Motion 사용
- 애니메이션이 필요한 컴포넌트는 Client Component로 선언

### 폼 처리
- react-hook-form + zod 스키마 검증
- 폼 스키마는 `lib/schemas/` 에 정의

## Key Files

- `app/layout.tsx` - 루트 레이아웃
- `app/page.tsx` - 홈페이지
- `next.config.ts` - Next.js 설정
- `components.json` - shadcn/ui 설정
