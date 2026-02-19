# Plan: catering-page

> (주)씨앤씨테크 케이터링 서비스 페이지 마이그레이션

## 1. Feature Overview

### 1.1 Summary
기존 정적 HTML 사이트의 케이터링 페이지(`catering.html`)를 Next.js App Router + Tailwind CSS로 마이그레이션합니다. 8개 메뉴 아이템 그리드, "케이터링 문의하기" CTA 버튼, 케이터링 서비스 신청 폼을 포함합니다.

### 1.2 Background
- 기존 페이지: 인라인 CSS + 8개 메뉴 카드 + Formspree 기반 신청 폼
- 메뉴 데이터가 HTML에 하드코딩
- 신청 폼은 Formspree(`https://formspree.io/f/mblgvker`)로 전송
- 목표: 컴포넌트 기반 재구성, PageHero 재사용, 폼 컴포넌트 패턴 활용

### 1.3 Goal
- 기존 케이터링 페이지의 모든 콘텐츠를 1:1 마이그레이션
- 페이지 히어로 배너 (PageHero 컴포넌트 재사용)
- 8개 메뉴 아이템 카드 그리드
- "케이터링 문의하기" CTA 버튼 (폼으로 스크롤)
- 케이터링 서비스 신청 폼 (Formspree 연동)

## 2. Requirements

### 2.1 Functional Requirements

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| FR-01 | 페이지 히어로 배너 | Must | 배경 이미지(`catering-banner.png`) + "케이터링 서비스" 타이틀 |
| FR-02 | 섹션 타이틀 | Must | "메뉴 소개" |
| FR-03 | 메뉴 아이템 카드 (8개) | Must | 에스프레소, 드립커피, 콜드브루, 커피백, 아몬드쿠키, 머랭쿠키, 초코쿠키, 티라미수 |
| FR-04 | CTA 버튼 | Must | "케이터링 문의하기" → 폼 섹션으로 스크롤 |
| FR-05 | 서비스 안내 텍스트 | Must | "최대 250분까지의 케이터링 서비스가 가능하며 모든 식음료는 고객의 요청에 따라 맞춤 변경이 가능합니다." |
| FR-06 | 케이터링 신청 폼 | Must | 이름, 이메일, 행사 날짜, 요청 사항 |
| FR-07 | 폼 제출 (Formspree) | Must | `https://formspree.io/f/mblgvker`로 POST 전송 |
| FR-08 | 반응형 그리드 | Must | 메뉴 그리드 반응형 레이아웃 |

### 2.2 Non-Functional Requirements

| ID | Requirement | Description |
|----|-------------|-------------|
| NFR-01 | 이미지 최적화 | next/image 사용 |
| NFR-02 | 접근성 | 폼 label + id 연결, 필수 필드 표시 |
| NFR-03 | SEO | 시맨틱 HTML, 페이지별 메타데이터 |

## 3. Scope

### 3.1 In Scope
- `/catering` 라우트 페이지 생성
- PageHero 컴포넌트 재사용
- 메뉴 아이템 카드 컴포넌트
- 케이터링 신청 폼 컴포넌트 (Client Component)
- CTA 버튼 (앵커 링크)
- 메뉴 이미지 에셋 복사 (9개 파일)
- Formspree 폼 연동

### 3.2 Out of Scope
- bkend.ai 연동 (메뉴 동적 관리)
- 실시간 예약/캘린더 기능
- 결제 기능

## 4. Technical Approach

### 4.1 Component Structure

```
src/
├── app/
│   └── catering/
│       └── page.tsx                # Catering page
├── components/
│   └── features/
│       ├── PageHero.tsx            # 재사용 (이미 존재)
│       ├── MenuItem.tsx            # 메뉴 아이템 카드
│       └── CateringForm.tsx        # 케이터링 신청 폼 (Client Component)
└── lib/
    └── catering-data.ts           # 메뉴 데이터
```

### 4.2 Key Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| PageHero | 재사용 | 이미 존재, props만 변경 |
| MenuItem | Server Component | 인터랙션 없음, 이미지 + 텍스트만 |
| CateringForm | Client Component | 폼 제출 + 상태 관리 |
| 폼 전송 | Formspree (기존 유지) | training-page와 동일한 패턴 |
| CTA 스크롤 | `<a href="#catering-form">` | 간단한 앵커 링크 |

### 4.3 Data Structure

```typescript
interface CateringMenuItem {
  id: string;
  name: string;
  image: string;
  alt: string;
  description: string;
}
```

### 4.4 Form Fields

| Field | Type | Name | Required |
|-------|------|------|----------|
| 이름 | text | name | Yes |
| 이메일 | email | email | Yes |
| 행사 날짜 | date | date | No |
| 요청 사항 | textarea | message | No |

### 4.5 Image Migration
기존 사이트에서 케이터링 관련 이미지 복사 (9개):
- 배너: `catering-banner.png`
- 메뉴: `espresso.png`, `dripcoffee.png`, `coldbrew.png`, `coffeebag.JPG`, `almond-cookie.png`, `meringue-cookie.png`, `choco-cookie.png`, `tiramisu.png`

## 5. Implementation Order

| Step | Task | Est. Files |
|------|------|-----------|
| 1 | 케이터링 이미지 에셋 복사 (9개) | public/images/* |
| 2 | CateringMenuItem 타입 정의 | types/index.ts |
| 3 | 메뉴 데이터 상수 정의 | lib/catering-data.ts |
| 4 | MenuItem 컴포넌트 | MenuItem.tsx |
| 5 | CateringForm 컴포넌트 | CateringForm.tsx |
| 6 | Catering 페이지 조합 | catering/page.tsx |
| 7 | 빌드 검증 | npm run build |

## 6. Risk & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| coffeebag.JPG 대소문자 | 이미지 로드 실패 | 파일명 확인 후 소문자 통일 검토 |
| 폼 필드가 training-page보다 적음 | 일관성 차이 | 케이터링 특성에 맞게 간소화 (날짜 필드 추가) |
| CTA 스크롤 위치 | UX 저하 | `scroll-mt` 클래스로 헤더 높이 보정 |

## 7. Success Criteria

- [ ] 히어로 배너에 catering-banner.png 배경 + "케이터링 서비스" 타이틀
- [ ] "메뉴 소개" 섹션 타이틀 표시
- [ ] 8개 메뉴 아이템 카드가 표시됨
- [ ] 반응형 그리드 (4열 → 2열 → 1열)
- [ ] "케이터링 문의하기" CTA 버튼이 폼으로 스크롤
- [ ] 케이터링 서비스 안내 텍스트 표시
- [ ] 신청 폼 4개 필드 표시
- [ ] 폼 제출이 Formspree로 정상 전송됨
- [ ] 폼 제출 후 성공/실패 메시지 표시
- [ ] 모든 이미지 next/image 최적화
- [ ] `npm run build` 성공

---

*Created: 2026-02-10*
*Feature: catering-page*
*Phase: Plan*
