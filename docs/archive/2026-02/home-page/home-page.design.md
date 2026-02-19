# Design: home-page

> 홈페이지 메인 페이지 컴포넌트 설계 및 구현 상세

**Plan Reference**: `docs/01-plan/features/home-page.plan.md`

---

## 1. Component Architecture

### 1.1 Component Tree

```
layout.tsx (Server)
├── Header (Client) ─── "use client"
│   ├── Logo (Image + Link)
│   ├── NavLinks (ul > li > Link)
│   └── HamburgerButton (mobile toggle)
├── {children}
│   └── page.tsx (Server)
│       ├── HeroSlider (Client) ─── "use client"
│       │   ├── Slide[] (Image + Caption + CTA)
│       │   ├── PrevButton
│       │   ├── NextButton
│       │   └── DotPagination
│       ├── AboutSection (Server)
│       │   ├── SearTech section
│       │   ├── CustomerSupport section
│       │   └── QualityInfo section
│       ├── MasterProfile (Server)
│       │   ├── ProfileImage
│       │   └── CareerList
│       └── CoffeeExpertise (Server)
│           └── PrincipleList (ol)
└── Footer (Server)
```

### 1.2 Client vs Server Components

| Component | Type | Reason |
|-----------|------|--------|
| Header | Client | 햄버거 메뉴 토글 (useState), `usePathname()` for active link |
| HeroSlider | Client | embla-carousel 사용, autoplay, 사용자 인터랙션 |
| AboutSection | Server | 정적 텍스트 콘텐츠, 인터랙션 없음 |
| MasterProfile | Server | 정적 프로필 데이터, 인터랙션 없음 |
| CoffeeExpertise | Server | 정적 텍스트 콘텐츠, 인터랙션 없음 |
| Footer | Server | 정적 저작권 텍스트 |

---

## 2. Component Specifications

### 2.1 Header (`src/components/features/Header.tsx`)

**Type**: Client Component (`"use client"`)

**Props**: None (self-contained)

**State**:
```typescript
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const pathname = usePathname();
```

**Navigation Items**:
```typescript
const NAV_ITEMS = [
  { href: "/", label: "홈" },
  { href: "/products", label: "제품 소개" },
  { href: "/training", label: "교육 컨설팅" },
  { href: "/catering", label: "케이터링" },
  { href: "/b2b", label: "B2B" },
] as const;
```

**Layout (Tailwind)**:
```
<header>  →  fixed top-0 w-full z-50 bg-white shadow-sm
  <div>   →  max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-[110px]
    <Logo>  →  Link > Image (height: 70px)
    <nav>
      <button>  →  md:hidden (hamburger ☰)
      <ul>      →  hidden md:flex gap-8 | mobile: flex flex-col absolute bg-white
        <li><Link> → text-base font-medium text-gray-800
                     active: underline underline-offset-4
```

**Behavior**:
- Desktop (>=768px): 가로 메뉴, 햄버거 숨김
- Mobile (<768px): 햄버거 표시, 클릭 시 드롭다운 메뉴 토글
- Active link: `pathname === href` 시 밑줄 표시
- 메뉴 외부 클릭 시 모바일 메뉴 닫기

**CSS-to-Tailwind Mapping**:
| Original CSS | Tailwind Class |
|-------------|----------------|
| `position: fixed; top: 0; width: 100%; z-index: 100` | `fixed top-0 w-full z-50` |
| `background: #fff` | `bg-white` |
| `box-shadow: 0 2px 4px rgba(0,0,0,0.1)` | `shadow-sm` |
| `padding: 20px 40px` | `px-10 py-5` |
| `height: 70px` (logo) | `h-[70px]` |
| `gap: 2rem` (nav) | `gap-8` |
| `font-size: 1rem; font-weight: 500` | `text-base font-medium` |
| `text-decoration: underline` (active) | `underline underline-offset-4` |
| `display: none` (hamburger desktop) | `md:hidden` |

---

### 2.2 HeroSlider (`src/components/features/HeroSlider.tsx`)

**Type**: Client Component (`"use client"`)

**Dependencies**: `embla-carousel-react`, `embla-carousel-autoplay`

**Props**: None (slide data is hardcoded)

**Slide Data**:
```typescript
const SLIDES = [
  {
    image: "/images/slide1.png",
    alt: "스페셜 블렌드 런칭",
    title: "good coffee makes a good day",
    subtitle: "스페셜 블렌드 런칭",
    cta: { label: "자세히 보기", href: "/products" },
  },
  {
    image: "/images/slide2.png",
    alt: "싱글 오리진 신제품",
    title: "good coffee makes a good day",
    subtitle: "싱글 오리진 신제품",
    cta: { label: "구경하기", href: "/products" },
  },
  {
    image: "/images/slide3.png",
    alt: "정기배송 혜택",
    title: "good coffee makes a good day",
    subtitle: "정기배송 혜택",
    cta: { label: "신청하기", href: "/contact" },
  },
] as const;
```

**Layout (Tailwind)**:
```
<section>  →  relative w-full h-[60vh] min-h-[300px] mt-[110px] mb-12 overflow-hidden
  <div ref={emblaRef}>  →  overflow-hidden h-full
    <div>  →  flex h-full (embla container)
      <div>  →  flex-[0_0_100%] min-w-0 relative (each slide)
        <Image>   →  object-cover fill
        <div>     →  absolute bottom-[20%] left-[10%] text-white drop-shadow-lg
          <h2>    →  text-2xl md:text-4xl font-bold mb-2
          <Link>  →  inline-block bg-gray-800 text-white px-5 py-2.5 rounded
  <button prev>  →  absolute left-4 top-1/2 -translate-y-1/2
  <button next>  →  absolute right-4 top-1/2 -translate-y-1/2
  <div dots>     →  absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2
```

**Behavior**:
- Autoplay: 5000ms delay, `stopOnInteraction: false`
- Loop: enabled
- Navigation: Prev/Next arrows + dot pagination
- Dots: active dot highlighted with bg-white, others bg-white/50

**CSS-to-Tailwind Mapping**:
| Original CSS | Tailwind Class |
|-------------|----------------|
| `height: 60vh; min-height: 300px` | `h-[60vh] min-h-[300px]` |
| `margin-top: 80px` | `mt-[110px]` (match header height) |
| `margin-bottom: 50px` | `mb-12` |
| `object-fit: cover` | `object-cover` |
| `bottom: 20%; left: 10%` | `bottom-[20%] left-[10%]` |
| `font-size: 2rem` | `text-2xl md:text-4xl` |
| `text-shadow: 0 2px 8px rgba(0,0,0,0.6)` | `drop-shadow-lg` |
| `background: #333; padding: 0.6em 1.2em; border-radius: 4px` | `bg-gray-800 px-5 py-2.5 rounded` |

---

### 2.3 AboutSection (`src/components/features/AboutSection.tsx`)

**Type**: Server Component

**Props**: None (all content hardcoded from existing HTML)

**Structure**: 3 sub-sections within a single `<main>` wrapper

**Layout (Tailwind)**:
```
<main>  →  max-w-[1000px] mx-auto my-10 px-5

  <!-- Section 1: SEAR TECH -->
  <section>  →  py-10 border-b border-gray-200 mb-5
    <h2>  →  text-center text-3xl font-bold text-gray-800 mb-8
    <p>   →  text-left text-lg text-gray-600 mb-4 pl-5
    <p>   →  (same) + <span class="font-semibold text-gray-800">SEAR TECH</span>
    <p>   →  (same)

  <!-- Section 2: Customer Support -->
  <section>  →  py-10 border-b border-gray-200 mb-5
    <h2>  →  text-center text-3xl font-bold text-gray-800 mb-8
    <ul>  →  pl-5 text-lg text-gray-600 space-y-2 list-disc list-inside
      <li> × 8

  <!-- Section 3: Quality Info -->
  <section>  →  py-10 border-b border-gray-200 mb-5
    <h2>  →  text-center text-3xl font-bold text-gray-800 mb-8
    <p>   →  text-left text-lg text-gray-600 mb-4 pl-5
```

**CSS-to-Tailwind Mapping**:
| Original CSS | Tailwind Class |
|-------------|----------------|
| `max-width: 1000px; margin: 40px auto; padding: 0 20px` | `max-w-[1000px] mx-auto my-10 px-5` |
| `padding: 40px 0; border-bottom: 1px solid #eee; margin-bottom: 20px` | `py-10 border-b border-gray-200 mb-5` |
| `text-align: center; font-size: 2em; color: #333; margin-bottom: 30px` | `text-center text-3xl font-bold text-gray-800 mb-8` |
| `text-align: left; font-size: 1.1em; color: #555; margin-bottom: 15px; padding-left: 20px` | `text-left text-lg text-gray-600 mb-4 pl-5` |

**Content**: Exact Korean text from `isonglobal/index.html` lines 64-87

---

### 2.4 MasterProfile (`src/components/features/MasterProfile.tsx`)

**Type**: Server Component

**Props**: None

**Layout (Tailwind)**:
```
<section>  →  py-10 border-b border-gray-200 mb-5
  <h2>  →  text-center text-3xl font-bold text-gray-800 mb-8
  <div>  →  flex flex-col md:flex-row items-center gap-5 md:gap-10 justify-center
    <Image>  →  w-[150px] md:w-[400px] h-auto rounded-lg shadow-md
    <div>    →  flex-1 min-w-[300px]
      <p>    →  text-lg text-gray-600 mb-4
      <ul>   →  text-lg text-gray-600 space-y-1 list-disc list-inside
        <li> × 5 (career items)
```

**Image**: `/images/ceo.jpg` (이송 대표)
- Desktop: width 400px
- Mobile: width 150px
- `rounded-lg shadow-md`

**Career Items** (from existing HTML):
1. 前 WBC KOREA 코디네이터 및 대회 의장
2. WBC 아시아 최초 심사위원
3. 前 SCAE KOREA 코디네이터
4. 現 SCAE 커피 인증 시험 감독관
5. 現 Coffeeology 아시아 지역 인증관

---

### 2.5 CoffeeExpertise (`src/components/features/CoffeeExpertise.tsx`)

**Type**: Server Component

**Props**: None

**Layout (Tailwind)**:
```
<section>  →  py-10 (last section, no border-bottom)
  <h2>  →  text-center text-3xl font-bold text-gray-800 mb-8
  <p>   →  text-left text-lg text-gray-600 mb-4 pl-5
  <ol>  →  text-left text-lg text-gray-600 pl-11 list-decimal space-y-4
    <li>  →  <strong class="font-bold">건강한 커피 만들기</strong><br/>...
    <li>  →  <strong class="font-bold">일관된 품질 유지</strong><br/>...
```

---

### 2.6 Footer (`src/components/features/Footer.tsx`)

**Type**: Server Component

**Props**: None

**Layout (Tailwind)**:
```
<footer>  →  text-center py-5 text-gray-600 text-sm
  <p>  →  © 2026 C&C Tech Co., Ltd All rights reserved.
```

---

## 3. File Structure (Implementation)

```
src/
├── app/
│   ├── layout.tsx                    # MODIFY: Add Noto Sans KR, Header, Footer
│   ├── page.tsx                      # MODIFY: Home page composition
│   ├── providers.tsx                 # EXISTS: No changes
│   └── globals.css                   # MODIFY: Add body padding-top
├── components/
│   ├── ui/
│   │   └── .gitkeep                  # No UI components needed yet
│   └── features/
│       ├── Header.tsx                # NEW: Shared header + navigation
│       ├── Footer.tsx                # NEW: Shared footer
│       ├── HeroSlider.tsx            # NEW: Hero image slider
│       ├── AboutSection.tsx          # NEW: Company intro sections
│       ├── MasterProfile.tsx         # NEW: Roast master profile
│       └── CoffeeExpertise.tsx       # NEW: Coffee expertise section
└── public/
    └── images/                       # COPY: From isonglobal/images/
        ├── C&C Logo_T.png
        ├── slide1.png
        ├── slide2.png
        ├── slide3.png
        └── ceo.jpg
```

---

## 4. Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `embla-carousel-react` | latest | Carousel core for React |
| `embla-carousel-autoplay` | latest | Autoplay plugin |

**Install command**:
```bash
npm install embla-carousel-react embla-carousel-autoplay
```

---

## 5. Layout Modifications

### 5.1 Root Layout (`layout.tsx`)

**Changes**:
- Replace Geist fonts with Noto Sans KR via `next/font/google`
- Import and render `<Header />` and `<Footer />`
- Add `pt-[110px]` to body for fixed header offset

```typescript
import { Noto_Sans_KR } from "next/font/google";
import { Header } from "@/components/features/Header";
import { Footer } from "@/components/features/Footer";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-kr",
});
```

### 5.2 globals.css Addition

```css
body {
  padding-top: 110px; /* Fixed header height offset */
}
```

### 5.3 Home Page (`page.tsx`)

**Composition**:
```tsx
import { HeroSlider } from "@/components/features/HeroSlider";
import { AboutSection } from "@/components/features/AboutSection";
import { MasterProfile } from "@/components/features/MasterProfile";
import { CoffeeExpertise } from "@/components/features/CoffeeExpertise";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <main className="max-w-[1000px] mx-auto my-10 px-5">
        <AboutSection />
        <MasterProfile />
        <CoffeeExpertise />
      </main>
    </>
  );
}
```

---

## 6. Responsive Design Spec

### 6.1 Breakpoints

| Breakpoint | Value | Tailwind Prefix |
|-----------|-------|-----------------|
| Mobile | < 768px | default |
| Desktop | >= 768px | `md:` |

### 6.2 Responsive Behaviors

| Component | Mobile (< 768px) | Desktop (>= 768px) |
|-----------|-------------------|---------------------|
| Header | 로고 + 햄버거, 드롭다운 메뉴 | 로고 + 가로 네비게이션 |
| HeroSlider | h-[60vh], 캡션 text-2xl | h-[60vh], 캡션 text-4xl |
| MasterProfile | 세로 정렬, 이미지 150px | 가로 정렬, 이미지 400px |
| AboutSection | padding 줄임 (px-4) | 기본 패딩 (px-5) |
| Footer | 동일 | 동일 |

---

## 7. Image Assets

| File | Source | Usage | next/image Props |
|------|--------|-------|-----------------|
| `C&C Logo_T.png` | isonglobal/images/ | Header 로고 | `width={180} height={70}` |
| `slide1.png` | isonglobal/images/ | Slider 1번 | `fill` + `object-cover` |
| `slide2.png` | isonglobal/images/ | Slider 2번 | `fill` + `object-cover` |
| `slide3.png` | isonglobal/images/ | Slider 3번 | `fill` + `object-cover` |
| `ceo.jpg` | isonglobal/images/ | 대표자 사진 | `width={400} height={500}` |

**Priority Loading**:
- Logo: `priority={true}` (above the fold)
- Slide 1: `priority={true}` (first visible slide)
- Slide 2, 3: default lazy loading
- ceo.jpg: default lazy loading

---

## 8. Implementation Order

| Step | File | Action | Dependencies |
|------|------|--------|-------------|
| 1 | `public/images/*` | 이미지 에셋 복사 | None |
| 2 | `package.json` | embla-carousel 설치 | None |
| 3 | `src/components/features/Header.tsx` | Header 컴포넌트 생성 | Images |
| 4 | `src/components/features/Footer.tsx` | Footer 컴포넌트 생성 | None |
| 5 | `src/app/layout.tsx` | Layout 업데이트 (폰트, Header, Footer) | Header, Footer |
| 6 | `src/app/globals.css` | body padding-top 추가 | None |
| 7 | `src/components/features/HeroSlider.tsx` | Slider 컴포넌트 생성 | embla, Images |
| 8 | `src/components/features/AboutSection.tsx` | 회사 소개 컴포넌트 | None |
| 9 | `src/components/features/MasterProfile.tsx` | 대표 프로필 컴포넌트 | Images |
| 10 | `src/components/features/CoffeeExpertise.tsx` | 커피 전문성 컴포넌트 | None |
| 11 | `src/app/page.tsx` | 홈 페이지 조합 | Steps 7-10 |
| 12 | Build verification | `npm run build` | All |

---

## 9. Verification Checklist

### Content Match (vs existing HTML)
- [ ] Header: 로고 이미지, 5개 네비게이션 링크 텍스트 일치
- [ ] Slider: 3개 슬라이드 이미지/제목/CTA 텍스트 일치
- [ ] Section 1: "첨단 커피 로스팅" 제목 + 3개 문단 텍스트 일치
- [ ] Section 2: "고객과 커피숍을 지원하는 방법" 제목 + 8개 항목 일치
- [ ] Section 3: "추가 품질 정보" 제목 + 문단 텍스트 일치
- [ ] Section 4: "로스트 마이스터 소개" 제목 + 소개 + 5개 경력 일치
- [ ] Section 5: "커피 전문성" 제목 + 소개 + 2개 원칙 일치
- [ ] Footer: 저작권 텍스트 일치

### Functional
- [ ] Slider 자동 재생 (5초)
- [ ] Slider 이전/다음 버튼 동작
- [ ] Slider 도트 페이지네이션 동작
- [ ] 모바일 햄버거 메뉴 토글
- [ ] 활성 네비게이션 링크 밑줄 표시
- [ ] 모든 이미지가 next/image로 렌더링

### Responsive
- [ ] 768px 이하: 햄버거 메뉴 표시, 가로 메뉴 숨김
- [ ] 768px 이하: 대표 프로필 세로 정렬, 이미지 150px
- [ ] 768px 이상: 가로 메뉴 표시, 대표 프로필 가로 정렬

### Build
- [ ] `npm run build` 성공 (0 errors)
- [ ] `npm run lint` 통과

---

*Created: 2026-02-10*
*Feature: home-page*
*Phase: Design*
*Plan Reference: docs/01-plan/features/home-page.plan.md*
