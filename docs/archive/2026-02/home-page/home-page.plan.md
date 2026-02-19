# Plan: home-page

> (주)씨앤씨테크 홈페이지 메인 페이지 마이그레이션

## 1. Feature Overview

### 1.1 Summary
기존 정적 HTML/CSS 사이트(isonglobal/)의 메인 페이지를 Next.js 15 App Router + Tailwind CSS로 마이그레이션합니다. 공유 레이아웃(Header, Footer, Navigation)을 포함하여 전체 사이트의 기반이 되는 페이지입니다.

### 1.2 Background
- 현재 사이트: `cnctechlab.co.kr` (GitHub Pages, 정적 HTML/CSS)
- 문제점: 콘텐츠 업데이트 어려움, 동적 기능 부재, SEO 한계
- 목표: Next.js 기반 동적 사이트로 전환하여 관리 효율성 및 확장성 확보

### 1.3 Goal
- 기존 홈페이지의 모든 콘텐츠를 Next.js로 1:1 마이그레이션
- 반응형 디자인 유지 (모바일/데스크톱)
- 공유 레이아웃 컴포넌트 구축 (Header, Footer, Nav)
- 이미지 최적화 (Next.js Image 컴포넌트 활용)

## 2. Requirements

### 2.1 Functional Requirements

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| FR-01 | 공유 Header/Nav | Must | 로고, 네비게이션 메뉴 (홈, 제품소개, 교육컨설팅, 케이터링, B2B), 모바일 햄버거 메뉴 |
| FR-02 | Hero Slider | Must | 3개 슬라이드 자동 재생 (5초 간격), 이전/다음 버튼, 페이지네이션 |
| FR-03 | 회사 소개 섹션 | Must | SEAR TECH 기술 소개, 고객 지원 방법, 품질 정보 |
| FR-04 | 로스트 마이스터 소개 | Must | 대표자(이송) 프로필, 경력 목록, 이미지 |
| FR-05 | 커피 전문성 섹션 | Must | 건강한 커피 / 일관된 품질 두 가지 원칙 |
| FR-06 | 공유 Footer | Must | 저작권 표시 |
| FR-07 | 반응형 디자인 | Must | 768px 이하 모바일 레이아웃 대응 |

### 2.2 Non-Functional Requirements

| ID | Requirement | Description |
|----|-------------|-------------|
| NFR-01 | 성능 | Lighthouse 성능 점수 90+ 목표 |
| NFR-02 | SEO | 시맨틱 HTML, Open Graph 메타 태그 |
| NFR-03 | 접근성 | 이미지 alt 태그, 키보드 네비게이션 |
| NFR-04 | 이미지 최적화 | next/image 사용, WebP 변환 |

## 3. Scope

### 3.1 In Scope
- 메인 페이지 (`/`) 전체 마이그레이션
- 공유 레이아웃: Header, Footer, Navigation
- Hero Slider (Swiper → embla-carousel 또는 유사 라이브러리)
- 5개 콘텐츠 섹션 마이그레이션
- 이미지 에셋 복사 및 최적화
- 모바일 반응형 대응

### 3.2 Out of Scope
- 제품 소개 페이지 (별도 feature)
- 교육 컨설팅 페이지 (별도 feature)
- 케이터링 페이지 (별도 feature)
- B2B 페이지 (별도 feature)
- Contact/문의 페이지 (별도 feature)
- 인증/로그인 기능
- bkend.ai 데이터 연동 (추후 동적 콘텐츠 관리 시)

## 4. Technical Approach

### 4.1 Component Structure

```
src/
├── app/
│   ├── layout.tsx           # Root Layout (Header + Footer)
│   └── page.tsx             # Home page
├── components/
│   ├── ui/
│   │   └── Button.tsx       # 공통 버튼
│   └── features/
│       ├── Header.tsx       # 공유 헤더 + 네비게이션
│       ├── Footer.tsx       # 공유 푸터
│       ├── HeroSlider.tsx   # 히어로 슬라이더 (Client Component)
│       ├── AboutSection.tsx # 회사 소개 섹션
│       ├── MasterProfile.tsx # 로스트 마이스터 프로필
│       └── CoffeeExpertise.tsx # 커피 전문성 섹션
└── public/
    └── images/              # 이미지 에셋 (기존 사이트에서 복사)
```

### 4.2 Key Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Slider 라이브러리 | embla-carousel | 가볍고 React 친화적, Swiper보다 번들 사이즈 작음 |
| 이미지 처리 | next/image | 자동 최적화, WebP 변환, lazy loading |
| 폰트 | next/font (Noto Sans KR) | 자체 호스팅으로 Google Fonts 외부 요청 제거 |
| 컴포넌트 타입 | Server Component 기본 | Slider만 Client Component |

### 4.3 Image Migration
- `isonglobal/images/` → `cnc-home/public/images/` 복사
- 필요한 이미지: `C&C Logo_T.png`, `slide1.png`, `slide2.png`, `slide3.png`, `ceo.jpg`
- next/image로 자동 최적화

## 5. Implementation Order

| Step | Task | Est. Files |
|------|------|-----------|
| 1 | 이미지 에셋 복사 | public/images/* |
| 2 | Noto Sans KR 폰트 설정 | layout.tsx |
| 3 | Header/Nav 컴포넌트 | Header.tsx |
| 4 | Footer 컴포넌트 | Footer.tsx |
| 5 | Root Layout 업데이트 | layout.tsx |
| 6 | HeroSlider 컴포넌트 | HeroSlider.tsx + embla 설치 |
| 7 | AboutSection 컴포넌트 | AboutSection.tsx |
| 8 | MasterProfile 컴포넌트 | MasterProfile.tsx |
| 9 | CoffeeExpertise 컴포넌트 | CoffeeExpertise.tsx |
| 10 | Home page 조합 | page.tsx |
| 11 | 반응형 스타일 검증 | 전체 |

## 6. Risk & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| 이미지 파일 크기 | 페이지 로드 지연 | next/image 자동 최적화 활용 |
| Slider 라이브러리 호환성 | 기존 동작 차이 | embla-carousel 충분한 테스트 |
| 폰트 로딩 지연 | FOUT/FOIT | next/font로 사전 로드 |
| 기존 콘텐츠 누락 | 불완전한 마이그레이션 | 기존 HTML과 1:1 대조 검증 |

## 7. Success Criteria

- [ ] 기존 사이트와 동일한 콘텐츠가 표시됨
- [ ] Hero Slider가 자동 재생 및 수동 탐색 가능
- [ ] 모바일 (768px 이하)에서 레이아웃 정상 작동
- [ ] 모든 이미지가 next/image로 최적화됨
- [ ] Lighthouse 성능 점수 90+
- [ ] Header/Footer가 전체 사이트에서 공유 가능한 구조

---

*Created: 2026-02-10*
*Feature: home-page*
*Phase: Plan*
