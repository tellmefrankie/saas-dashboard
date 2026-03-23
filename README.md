# Admin Pro — SaaS 어드민 대시보드

한국형 SaaS 어드민 대시보드. 주문/결제, 회원, 예약 관리 기능을 갖춘 프로페셔널한 관리자 패널입니다.

**[라이브 데모](https://frank-saas-dashboard.vercel.app/)**

![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white)

## 스크린샷

### 대시보드 메인

![대시보드](https://github.com/tellmefrankie/saas-dashboard/releases/download/screenshots/01-dashboard.png)

### 주문 목록

![주문 목록](https://github.com/tellmefrankie/saas-dashboard/releases/download/screenshots/02-orders.png)

### 주문 상세 (결제 정보)

![주문 상세](https://github.com/tellmefrankie/saas-dashboard/releases/download/screenshots/03-order-detail.png)

### 회원 관리

![회원 관리](https://github.com/tellmefrankie/saas-dashboard/releases/download/screenshots/04-members.png)

### 예약 관리

![예약 관리](https://github.com/tellmefrankie/saas-dashboard/releases/download/screenshots/05-reservation.png)

## 주요 기능

- **대시보드** — 오늘 매출, 신규 주문, 신규 회원, 전환율 통계 카드 + 월별 매출 차트
- **주문/결제 관리** — 주문 목록 (필터, 검색, 페이지네이션) + 주문 상세 (토스페이먼츠 스타일 결제 정보)
- **회원 관리** — 회원 목록 (등급 VVIP/VIP/일반, 상태 필터) + 주문이력/누적결제금액
- **예약 관리** — 예약 목록 + 월간 캘린더 뷰 (날짜별 예약 건수)
- **설정** — 프로필, 계정, 테마(라이트/다크), 알림, 화면 설정
- **반응형 레이아웃** — 모바일/태블릿/데스크톱 대응
- **다크모드** — 라이트/다크 테마 토글

## 기술 스택

| 카테고리   | 기술                                   |
| ---------- | -------------------------------------- |
| 프레임워크 | Vite + React 19                        |
| 언어       | TypeScript (strict)                    |
| 라우팅     | TanStack Router (파일 기반)            |
| 상태관리   | TanStack React Query + Zustand         |
| UI         | Tailwind CSS v4 + shadcn/ui (Radix UI) |
| 차트       | Recharts                               |
| 폼/검증    | React Hook Form + Zod                  |
| 아이콘     | Lucide React                           |

## 아키텍처

```mermaid
graph TD
    A[Vite Dev Server] --> B[React 19 + TypeScript]
    B --> C[TanStack Router]
    C --> D[Pages / Routes]
    D --> E[대시보드]
    D --> F[주문관리]
    D --> G[회원관리]
    D --> H[예약관리]
    D --> I[설정]
    B --> J[shadcn/ui Components]
    B --> K[Tailwind CSS v4]
    B --> L[Zustand Store]
    B --> M[Mock Data]
```

## 로컬 실행

```bash
git clone https://github.com/tellmefrankie/saas-dashboard.git
cd saas-dashboard
pnpm install
pnpm dev
```

`http://localhost:5173`에서 확인할 수 있습니다.

## 빌드

```bash
pnpm build
pnpm preview
```

## 라이선스

MIT
