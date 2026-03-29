# Portpolio - Design System

개인 포트폴리오 웹사이트 디자인 시스템

---

## 1. Style Direction

**Motion-Driven Minimalism + Storytelling**

- 작품이 주인공이 되는 뉴트럴 배경 + 절제된 애니메이션
- Scroll 기반 스토리텔링으로 몰입감 제공 (단순 나열 X, 흐름이 있는 구조)
- 깔끔한 그리드 레이아웃, 불필요한 장식 배제

### Secondary Style 옵션 (부분 적용 가능)

| 스타일 | 적용 포인트 | 효과 |
|--------|------------|------|
| **Brutalism** | Hero 섹션 타이포그래피 | 강렬한 첫인상, 개성 표현 |
| **Aurora UI** | 배경 그라디언트 효과 | 은은한 색감 변화로 분위기 형성 |

---

## 2. Page Structure

### 라우트 구조

```
/                           — 메인 (원페이지 스크롤)
/projects/[slug]            — 프로젝트 상세 페이지
```

### 메인 페이지 (`/`)

| 순서 | 섹션 | 설명 |
|------|------|------|
| 1 | **Hero** | 이름/역할 + 한 줄 소개 + 채널 링크 + 스크롤 유도 |
| 2 | **About** | 경력 서사 (스토리텔링) + 핵심 성과 수치 하이라이트 |
| 3 | **Career** | 타임라인 (KRAFTON → COOKAPPS, 연도별 주요 이벤트) |
| 4 | **Projects** | 탭 필터: "커리어 프로젝트" / "사이드 프로젝트", 카드 클릭 → 상세 페이지 |
| 5 | **Skills** | Tech (Client/Server/AI) + Management 시각화 |
| 6 | **Sharing** | 발표/세션 카드 (PDF, 영상 링크) |
| 7 | **Contact** | 연락 폼 + 직접 연락처 (이메일, 전화) |

### 프로젝트 상세 페이지 (`/projects/[slug]`)

각 프로젝트를 클릭하면 전용 상세 페이지로 이동합니다.

**slug 목록:**

| 카테고리 | 회사/출처 | 프로젝트 | slug |
|----------|----------|----------|------|
| 커리어 | COOKAPPS | 오토배틀러 프로젝트 | `auto-battler` |
| 커리어 | COOKAPPS | 무명기사단 | `unnamed-knights` |
| 커리어 | COOKAPPS | 오늘도던전 | `dungeon-today` |
| 커리어 | COOKAPPS | RANDOM ROYALE | `random-royale` |
| 커리어 | KRAFTON | TERA ORIGIN | `tera-origin` |
| 사이드 (앱) | — | 시그널퍼스트 | `signal-first` |
| 사이드 (웹) | — | 브릿지스팟 | `bridge-spots` |
| 사이드 (웹) | — | 오토배틀러 데이터 관리 | `auto-battler-sheets` |
| 사이드 (웹) | — | 반석 | `bansuk` |
| 사이드 (웹) | — | 네임태그프로 | `nametag-pro` |

### Storytelling Flow

스크롤하며 자연스럽게 이야기가 전개되는 구조:

```
Hero (나는 누구인가 — 한 줄로)
  ↓ 스크롤 유도
About (7년간의 여정 — 임팩트 중심 서사)
  ↓
Career (어디서 무엇을 했는가 — 타임라인)
  ↓
Projects (만든 것들 — 커리어/사이드 탭 분리)
  ↓
Skills (무엇을 할 수 있는가 — 기술 + 매니지먼트)
  ↓
Sharing (무엇을 나누었는가 — 발표/세션)
  ↓
Contact (함께 일하기)
```

각 섹션은 Intersection Observer 기반 진입 애니메이션으로 순차 등장합니다.

---

## 3. Color Palette

### Light Mode (기본)

| Role | Hex | 용도 |
|------|-----|------|
| Primary | `#18181B` | 주요 텍스트, 강조 버튼 |
| On Primary | `#FFFFFF` | Primary 위 텍스트 |
| Secondary | `#3F3F46` | 보조 텍스트 |
| Accent | `#2563EB` | 링크, 인터랙티브 요소 |
| Background | `#FAFAFA` | 페이지 배경 |
| Foreground | `#09090B` | 본문 텍스트 |
| Card | `#FFFFFF` | 카드 배경 |
| Muted | `#E8ECF0` | 비활성 배경 |
| Muted Foreground | `#64748B` | 보조 텍스트 |
| Border | `#E4E4E7` | 구분선 |
| Destructive | `#DC2626` | 에러/경고 |
| CTA | `#F97316` | Call-to-Action 버튼 |

### Dark Mode (추후 적용)

| Role | Hex | 용도 |
|------|-----|------|
| Primary | `#1E293B` | 주요 UI |
| Accent | `#22C55E` | 인터랙티브 요소 |
| Background | `#0F172A` | 페이지 배경 |
| Foreground | `#F8FAFC` | 본문 텍스트 |
| Card | `#1B2336` | 카드 배경 |
| Muted Foreground | `#94A3B8` | 보조 텍스트 |
| Border | `#475569` | 구분선 |

---

## 4. Typography

| 용도 | Font | Weight | 언어 |
|------|------|--------|------|
| Heading (영문) | **Archivo** | 600-700 | Latin |
| Body / 한국어 전체 | **Noto Sans KR** | 300-700 | Korean + Latin |

- 영문 Heading → Archivo로 개성 표현
- 한국어 텍스트 + 영문 Body → Noto Sans KR로 통일
- Fallback 순서: `Archivo, 'Noto Sans KR', system-ui, -apple-system, sans-serif`

```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
```

### Font Loading 전략

- `font-display: swap` 적용 (FOIT 방지)
- Next.js `next/font/google`으로 자동 최적화 (셀프 호스팅 + CLS 방지)
- Noto Sans KR은 subset이 크므로 `next/font`의 자동 서브셋팅 활용

```typescript
import { Archivo, Noto_Sans_KR } from 'next/font/google';

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' });
const notoSansKR = Noto_Sans_KR({ subsets: ['latin'], variable: '--font-noto-sans-kr' });
```

### Type Scale

| Level | Size | Line Height | 용도 |
|-------|------|-------------|------|
| Display | 48-64px | 1.1 | Hero 타이틀 |
| H1 | 36-40px | 1.2 | 섹션 타이틀 |
| H2 | 24-28px | 1.3 | 서브 타이틀 |
| H3 | 20px | 1.4 | 카드 타이틀 |
| Body | 16-18px | 1.6 | 본문 |
| Small | 14px | 1.5 | 캡션, 레이블 |

---

## 5. Spacing & Layout

- **Grid**: 4px 기준 (4, 8, 12, 16, 24, 32, 48, 64)
- **Container**: max-w-6xl (1152px), 양쪽 패딩 16-24px
- **Section 간격**: 80-120px
- **카드 간격**: 16-24px

### Breakpoints

| Name | Width | 용도 |
|------|-------|------|
| sm | 375px | 모바일 |
| md | 768px | 태블릿 |
| lg | 1024px | 데스크탑 |
| xl | 1440px | 와이드 |

---

## 6. Animation Guidelines (Framer Motion)

### 원칙
- 모든 애니메이션 150-300ms (최대 400ms)
- `ease-out`으로 진입, `ease-in`으로 퇴장
- `transform`과 `opacity`만 사용 (width/height 금지)
- `prefers-reduced-motion` 반드시 존중

### 주요 인터랙션

| 요소 | 효과 | Duration |
|------|------|----------|
| 섹션 진입 | Fade up (Y: 20px → 0) | 400ms |
| 프로젝트 카드 hover | Scale 1.02 + Shadow 증가 | 200ms |
| 타임라인 노드 | 스크롤 시 순차 등장 (stagger 50ms) | 300ms |
| 성과 수치 배지 | Count-up 애니메이션 | 800ms |
| 스킬 태그 | Stagger fade-in | 200ms (30ms 간격) |
| 페이지 전환 | Fade + Slide | 300ms |
| 스크롤 진행 | Progress bar | 실시간 |
| 버튼 hover | Background color transition | 150ms |
| 탭 전환 | Content crossfade | 200ms |

### Framer Motion 기본 설정

```typescript
// 섹션 진입 애니메이션
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
};

// Reduced motion 대응
const prefersReducedMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.01 }
};
```

---

## 7. Component Patterns

### Hero
- 이름: Display 사이즈, Archivo Bold
- 역할: "기술로 비즈니스 임팩트를 만드는 개발자"
- 채널 링크: GitHub, LinkedIn, Blog — 아이콘 버튼으로 가로 배치
- 스크롤 유도: 하단에 애니메이션 화살표 (bounce)
- 모바일: 채널 링크 아이콘만 표시

### About (경력 서사)
- 핵심 성과 수치를 카드/배지로 하이라이트:
  - `7년차` · `연매출 170억` · `팀 3→16명 빌딩` · `BEP 2개월 달성` · `D1 리텐션 50%`
- 아래에 서사 텍스트 (연도순 스크롤)
- 긴 텍스트는 "더 보기" 토글로 접기 (모바일 UX)

### Career Timeline
- 세로 타임라인 UI (좌측 연도, 우측 내용)
- 모바일: 단일 컬럼 타임라인
- 주요 노드:
  - `2019.04` KRAFTON 입사 — TERA ORIGIN
  - `2020.04` COOKAPPS 합류 — 랜덤로얄
  - `2021` 오늘도던전 메인 클라이언트
  - `2022.04` PO 전환 — 무명기사단 시작
  - `2023.04` 무명기사단 런칭 → BEP 달성 → 글로벌 확장
  - `2024` 원펀맨 콜라보 + 스텔라나이츠 기획
  - `2025` 중국 외자판호 + 스텔라나이츠 재개
  - `2026` AI/MAS 시스템 구축 + BRIDGE SPOTS + SignalFirst
- 각 노드 hover/tap 시 상세 설명 표시

### Projects (메인 페이지 섹션)
- **탭 필터**: `커리어 프로젝트` | `사이드 프로젝트`
- **커리어 프로젝트** (회사별 그룹핑):
  - COOKAPPS (2020.04~2026.03): 오토배틀러 프로젝트, 무명기사단, 오늘도던전, RANDOM ROYALE
  - KRAFTON (2019.04~2020.04): TERA ORIGIN
- **사이드 프로젝트** (유형별 그룹핑):
  - 앱 서비스: SignalFirst
  - 웹 서비스: BRIDGE SPOTS, AutoBattler Sheets, 반석, 네임태그프로
- 카드 구성:
  - 이미지 비율: 16:9 또는 4:3
  - `width`/`height` 또는 `aspect-ratio` 명시 (CLS 방지)
  - Hover: overlay 정보 (제목, 회사/유형, 기술 스택)
  - 터치 디바이스: tap으로 overlay 토글
  - **클릭 → `/projects/[slug]` 상세 페이지로 이동**
- **Skeleton UI**: 이미지 로딩 중 `animate-pulse` 플레이스홀더 표시
- **Lazy loading**: below-fold 카드는 `loading="lazy"` 적용
- 탭 선택 시 **URL 쿼리 파라미터에 반영** (`?tab=career` / `?tab=side`)

### Project Detail (상세 페이지: `/projects/[slug]`)

프로젝트 카드 클릭 시 전용 상세 페이지로 이동합니다.

- **레이아웃**:
  - 상단 Nav: 로고(← 메인) + 프로젝트명 + 이전/다음 프로젝트 네비
  - Hero 영역: 프로젝트 대표 이미지/영상 (풀 width)
  - 아래 콘텐츠: 2컬럼 (데스크탑), 1컬럼 (모바일)

- **콘텐츠 구성**:

  | 섹션 | 내용 |
  |------|------|
  | 개요 | 프로젝트명, 기간, 회사, 역할, 한 줄 설명 |
  | 상세 설명 | 프로젝트 배경, 목표, 해결한 문제 |
  | 핵심 성과 | 수치 하이라이트 (매출, 지표, 유저 수 등) |
  | 기술 스택 | 사용 기술 태그/뱃지 |
  | 담당 업무 | 구체적 기여 사항 (bullet list) |
  | 스크린샷/미디어 | 이미지 갤러리 또는 영상 임베드 |
  | 링크 | 서비스 URL, 앱 스토어, 관련 기사 등 |

- **UX 패턴**:
  - 페이지 전환: Framer Motion `layoutId`로 카드 → 상세 히어로 연결 (shared element transition)
  - 이전/다음 프로젝트: 하단 또는 상단에 네비게이션 (같은 카테고리 내)
  - 뒤로가기: 메인 Projects 섹션으로 복귀 (`scroll-behavior: smooth`로 해당 섹션 위치 복원)
  - 모바일: 스와이프로 이전/다음 프로젝트 전환

- **데이터 관리**:
  - 프로젝트 데이터는 `/data/projects.ts` (또는 MDX)로 관리
  - `generateStaticParams`로 빌드 시 정적 생성
  - OG 메타 태그: 프로젝트별 title, description, image

### Skills
- **Tech**: 3분류 시각화
  - Client: C, C#, C++, Swift, Vue.js / Unity3D, Xcode, DirectX12
  - Server: C++, Golang / SQL, Redis, IOCP, PUN2
  - AI: 자체 Orchestration, 7단계 플로우, 패키지 관리
- **Management**: 역할 기반 카드
  - 클라이언트 리드: 채용·육성, 리팩토링 주도
  - PO: 기획~아트 전 직군 매니지먼트, 데이터 기반 의사결정
  - 자체 서비스: BRIDGE SPOTS, AutoBattler Sheets
- 스킬 항목은 태그/뱃지 형태, 카테고리별 그룹핑

### Sharing (발표/세션)
- 카드 레이아웃 (2열 그리드, 모바일 1열)
- 카드 구성: 제목 + 한 줄 설명 + 태그 (사내/외부) + 링크 (PDF/영상)
- 항목:
  - 게임 개발에 필요한 질문들 — 쉐어링파티, 2023 GDC 리뷰
  - 유저가 게임에 가치를 느끼는 순간 — 쉐어링파티, YouTube 영상
  - 졸업할 때 알았더라면 — 한국공학대학교 세션
  - 슈퍼루키 게임 제작 가이드 — 쿡앱스 인턴 대상

### Navigation
- 상단 고정 (sticky), 높이만큼 **body에 padding-top 보정**
- **메인 페이지**: 7개 섹션 앵커 (Hero · About · Career · Projects · Skills · Sharing · Contact)
  - 현재 섹션 하이라이트 (Intersection Observer 연동)
  - `scroll-behavior: smooth` 앵커 링크
- **상세 페이지**: 로고(← 메인) + 프로젝트명 + 이전/다음 네비
  - 뒤로가기 시 메인 Projects 섹션 스크롤 위치 복원
- 모바일: 햄버거 메뉴
- 스크롤 시 배경 blur 처리 (`backdrop-blur-md`)

### Contact
- **직접 연락처** (상단):
  - 전화: 010-6623-2545
  - 이메일: eobub15@gmail.com
  - LinkedIn, GitHub, Blog 아이콘 링크
- **연락 폼** (하단):
  - 필드: 이름, 이메일, 메시지
  - **blur 시 인라인 검증** (keystroke 아님)
  - 에러 메시지는 **해당 필드 바로 아래** 표시
  - 에러 발생 시 **첫 번째 에러 필드로 자동 포커스**
  - 에러 영역에 `role="alert"` + `aria-live="polite"` 적용
  - 전송 버튼: 로딩 중 **disabled + spinner** 표시 (이중 전송 방지)
  - 전송 결과: 성공 시 토스트 (3-5초 자동 dismiss), 실패 시 재시도 안내

---

## 8. Icons

- **라이브러리**: Lucide React
- **크기**: 16px (sm), 20px (md), 24px (lg)
- **스타일**: Stroke 1.5-2px, 일관된 두께

---

## 9. Loading & Performance

- 프로젝트 이미지: `next/image` + WebP/AVIF 자동 변환
- Below-fold 이미지: `loading="lazy"` (Hero 이미지는 eager)
- 이미지 로딩 중: Skeleton placeholder (`animate-pulse`)
- 폰트: `next/font`으로 로컬 최적화 (FOIT/CLS 방지)
- 번들: 라우트별 코드 스플리팅 (Next.js 기본)
- CLS < 0.1 유지: 이미지 dimension 명시, 폰트 공간 예약

---

## 10. Accessibility Checklist

- [ ] 텍스트 대비율 4.5:1 이상 (light/dark 각각 검증)
- [ ] 포커스 링 표시 (2-4px, keyboard nav)
- [ ] 이미지에 alt 텍스트
- [ ] `prefers-reduced-motion` 대응
- [ ] 터치 타겟 최소 44x44px
- [ ] 색상만으로 정보 전달하지 않음 (아이콘/텍스트 병행)
- [ ] 시맨틱 HTML 사용 (h1→h2→h3 순서 준수)
- [ ] 반응형 (375px ~ 1440px)
- [ ] 폼 에러에 `role="alert"` 적용
- [ ] `cursor-pointer` 모든 클릭 요소에 적용
- [ ] Skip to main content 링크 제공
