# Design: b2b-page

> (주)씨앤씨테크 B2B 안내 페이지 상세 설계

## 1. Component Architecture

```
src/
└── app/b2b/
    └── page.tsx                    # B2B 페이지 (Server Component)
```

새로운 컴포넌트 불필요 — 단순 정보 페이지이므로 페이지 내 직접 작성.

## 2. Page Specification (`app/b2b/page.tsx`)

### 2.1 Metadata

```typescript
export const metadata: Metadata = {
  title: "B2B 안내 - (주)씨앤씨테크",
  description: "카페·기업 고객을 위한 도매 납품, 협업, 제휴 안내 - 씨앤씨테크",
};
```

### 2.2 Page Layout

```
┌──────────────────────────────────────────┐
│           B2B 컨테이너 (카드형)            │
│  max-w-[900px] mx-auto my-12 p-10       │
│  bg-white rounded-xl shadow-sm           │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  h1: 카페 · 기업 고객을 위한       │  │
│  │      B2B 안내                      │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌─ Section 1 ────────────────────────┐  │
│  │  h2: 도매 납품 안내                 │  │
│  │  p: 소개 텍스트                     │  │
│  │  ul:                               │  │
│  │    • 소량부터 대량까지 유연한 납품   │  │
│  │    • 매장 맞춤형 블렌딩 및 컨설팅   │  │
│  │    • 정기 납품 및 재고 관리 지원     │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌─ Section 2 ────────────────────────┐  │
│  │  h2: 협업 브랜드 사례               │  │
│  │  p: 국내 100여개 매장 납품 소개     │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌─ Section 3 ────────────────────────┐  │
│  │  h2: 상담 및 제휴 문의              │  │
│  │  p: contact 링크 텍스트             │  │
│  │  p: 이메일: isong8686@daum.net     │  │
│  │     전화: 02-371-3771              │  │
│  └────────────────────────────────────┘  │
│                                          │
└──────────────────────────────────────────┘
```

### 2.3 Tailwind Mapping

| 요소 | CSS (기존) | Tailwind |
|------|-----------|----------|
| 컨테이너 | `max-width:900px; margin:50px auto; padding:40px; background:#fff; border-radius:12px; box-shadow:0 4px 16px rgba(0,0,0,0.05)` | `max-w-[900px] mx-auto my-12 p-10 bg-white rounded-xl shadow-sm` |
| h1 | `text-align:center; margin-bottom:30px` | `text-center mb-8` |
| section | `margin-bottom:40px` | `mb-10` |
| h2 | (기본 스타일) | `text-xl font-semibold mb-4 text-[#222]` |
| p | (기본 스타일) | `text-[#444] leading-relaxed mb-4` |
| ul | `padding-left:20px; line-height:1.8` | `list-disc pl-5 leading-loose text-[#444]` |
| li | (기본 스타일) | (ul에서 상속) |
| strong | (기본 스타일) | `font-bold` |
| a (contact 링크) | (기본 스타일) | `text-blue-600 underline hover:text-blue-800` |

### 2.4 Contact Link

```typescript
import Link from "next/link";

<Link href="/contact" className="text-blue-600 underline hover:text-blue-800">
  문의 페이지
</Link>
```

## 3. Content (원본 텍스트 1:1 마이그레이션)

### 3.1 Section 1: 도매 납품 안내

**소개 텍스트**:
> (주)씨앤씨테크는 전국 카페 및 식음료 매장, 기업 고객에게 자사 제품 및 고객 맞춤형 원두 납품을 진행하고 있습니다. 다양한 블렌딩과 로스팅 프로파일로 고객의 매장 특성에 맞는 커피를 제공합니다.

**리스트 항목**:
1. 소량부터 대량까지 유연한 납품 시스템
2. 매장 맞춤형 블렌딩 및 테이스팅 컨설팅
3. 정기 납품 및 재고 관리 지원

### 3.2 Section 2: 협업 브랜드 사례

**텍스트**:
> 국내 100여개 매장에 원두를 납품하고 있으며 (주)씨앤씨테크는 컨설팅과 트레이닝을 지원하여 파트너와의 지속적인 성장을 추구합니다.

### 3.3 Section 3: 상담 및 제휴 문의

**텍스트**:
> 아래 버튼을 눌러 문의 페이지를 통해 연락 주시면 빠르게 답변드리겠습니다. 전화 및 이메일을 통한 상담도 가능합니다.

**연락처**:
- 이메일: isong8686@daum.net
- 전화: 02-371-3771

**"문의 페이지"**: `<Link href="/contact">` (next/link 사용)

## 4. Full Page Code

```typescript
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "B2B 안내 - (주)씨앤씨테크",
  description: "카페·기업 고객을 위한 도매 납품, 협업, 제휴 안내 - 씨앤씨테크",
};

export default function B2BPage() {
  return (
    <main className="max-w-[900px] mx-auto my-12 p-10 px-5 sm:px-10 bg-white rounded-xl shadow-sm">
      <h1 className="text-center mb-8">카페 · 기업 고객을 위한 B2B 안내</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-[#222]">도매 납품 안내</h2>
        <p className="text-[#444] leading-relaxed mb-4">
          (주)씨앤씨테크는 전국 카페 및 식음료 매장, 기업 고객에게 자사 제품 및
          고객 맞춤형 원두 납품을 진행하고 있습니다. 다양한 블렌딩과 로스팅
          프로파일로 고객의 매장 특성에 맞는 커피를 제공합니다.
        </p>
        <ul className="list-disc pl-5 leading-loose text-[#444]">
          <li>소량부터 대량까지 유연한 납품 시스템</li>
          <li>매장 맞춤형 블렌딩 및 테이스팅 컨설팅</li>
          <li>정기 납품 및 재고 관리 지원</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-[#222]">협업 브랜드 사례</h2>
        <p className="text-[#444] leading-relaxed">
          국내 100여개 매장에 원두를 납품하고 있으며 (주)씨앤씨테크는 컨설팅과
          트레이닝을 지원하여 파트너와의 지속적인 성장을 추구합니다.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-[#222]">상담 및 제휴 문의</h2>
        <p className="text-[#444] leading-relaxed mb-4">
          아래 버튼을 눌러{" "}
          <Link href="/contact" className="text-blue-600 underline hover:text-blue-800">
            문의 페이지
          </Link>
          를 통해 연락 주시면 빠르게 답변드리겠습니다. 전화 및 이메일을 통한
          상담도 가능합니다.
        </p>
        <p className="text-[#444] leading-relaxed">
          <strong className="font-bold">이메일:</strong> isong8686@daum.net
          <br />
          <strong className="font-bold">전화:</strong> 02-371-3771
        </p>
      </section>
    </main>
  );
}
```

## 5. Image Assets

없음 — 텍스트 전용 페이지.

## 6. Implementation Order

| Step | Task | File | Type |
|------|------|------|------|
| 1 | B2B 페이지 생성 | `app/b2b/page.tsx` | Server Component |
| 2 | 빌드 검증 | `npm run build` | Verify |

## 7. Verification Checklist

- [ ] 페이지 메타데이터: title="B2B 안내 - (주)씨앤씨테크"
- [ ] 페이지 메타데이터: description 설정
- [ ] 카드형 컨테이너: max-w-[900px], bg-white, rounded-xl, shadow-sm
- [ ] h1: "카페 · 기업 고객을 위한 B2B 안내" (text-center)
- [ ] Section 1: h2 "도매 납품 안내"
- [ ] Section 1: 소개 텍스트 포함
- [ ] Section 1: 3개 리스트 항목 (list-disc)
- [ ] Section 2: h2 "협업 브랜드 사례"
- [ ] Section 2: "국내 100여개 매장" 텍스트 포함
- [ ] Section 3: h2 "상담 및 제휴 문의"
- [ ] Section 3: "문의 페이지" Link (next/link, href="/contact")
- [ ] Section 3: 이메일 "isong8686@daum.net" 표시
- [ ] Section 3: 전화 "02-371-3771" 표시
- [ ] Link 스타일: text-blue-600 underline hover:text-blue-800
- [ ] `npm run build` 성공

---

*Created: 2026-02-10*
*Feature: b2b-page*
*Phase: Design*
