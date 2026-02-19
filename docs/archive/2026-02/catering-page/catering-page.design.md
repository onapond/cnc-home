# Design: catering-page

> (주)씨앤씨테크 케이터링 서비스 페이지 상세 설계

## 1. Component Architecture

```
src/
├── app/catering/
│   └── page.tsx                    # Catering 페이지 (Server Component)
├── components/features/
│   ├── PageHero.tsx                # 재사용 (이미 존재)
│   ├── MenuItem.tsx                # 메뉴 아이템 카드 (Server Component)
│   └── CateringForm.tsx            # 케이터링 신청 폼 (Client Component)
├── lib/
│   └── catering-data.ts           # 메뉴 데이터 상수
└── types/
    └── index.ts                    # CateringMenuItem 인터페이스 추가
```

## 2. Type Definitions

### 2.1 CateringMenuItem Interface (`types/index.ts`에 추가)

```typescript
export interface CateringMenuItem {
  id: string;
  name: string;
  image: string;
  alt: string;
  description: string;
}
```

## 3. Component Specifications

### 3.1 PageHero (재사용 - 이미 존재)

```typescript
<PageHero
  backgroundImage="/images/catering-banner.png"
  title="케이터링 서비스"
/>
```

### 3.2 MenuItem (Server Component)

**파일**: `src/components/features/MenuItem.tsx`

**Props**:
```typescript
interface MenuItemProps {
  item: CateringMenuItem;
}
```

**렌더링**:
```
┌────────────────────┐
│  ┌──────────────┐  │
│  │  메뉴 이미지  │  │  ← rounded-lg
│  └──────────────┘  │
│    메뉴 이름        │
│    설명 텍스트      │
└────────────────────┘
```

**Tailwind 매핑**:
| CSS (기존) | Tailwind |
|-----------|----------|
| `text-align: center` | `text-center` |
| 이미지 `width: 100%; border-radius: 8px; margin-bottom: 10px` | `w-full rounded-lg mb-2.5` |
| 제목 `font-size: 1.1rem; margin-bottom: 0.5rem` | `text-lg font-semibold mb-2` |
| 설명 `font-size: 0.95rem; color: #555` | `text-sm text-[#555]` |

**구현 상세**:
- next/image 사용, `width={300} height={200}` + `className="w-full rounded-lg mb-2.5"`
- `sizes` 속성: `"(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"`

### 3.3 CateringForm (Client Component)

**파일**: `src/components/features/CateringForm.tsx`

**"use client"** 필요: 폼 제출 상태 관리

**State**:
```typescript
const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
```

**렌더링**:
```
┌──────────────────────────────────────────┐
│      케이터링 서비스 신청                   │
│  최대 250분까지의 케이터링 서비스가 가능하며 │
│  모든 식음료는 고객의 요청에 따라            │
│  맞춤 변경이 가능합니다.                    │
│                                           │
│  이름 *          [________________]       │
│  이메일 *        [________________]       │
│  행사 날짜       [________________]       │
│  요청 사항       [                ]       │
│                  [________________]       │
│                                           │
│  [        케이터링 신청        ]            │
│                                           │
│  ✓ 신청 완료 메시지 (성공)                  │
│  ✗ 오류 메시지 (실패)                       │
└──────────────────────────────────────────┘
```

**Tailwind 매핑**:
| 요소 | Tailwind |
|------|----------|
| 컨테이너 | `max-w-[800px] mx-auto mt-20 mb-10 px-5` |
| 내부 래퍼 | `bg-white rounded-lg shadow-sm p-10 px-5 sm:px-10` |
| 제목 | `text-center text-[#222] mb-2` |
| 안내 텍스트 | `text-center text-[#666] mb-8 leading-relaxed` |
| label | `block mb-2 font-bold text-[#444]` |
| input/textarea | `w-full p-3 mb-5 border border-[#ddd] rounded-md text-base` |
| button | `w-full p-4 bg-[#333] text-white border-none rounded-md text-lg font-bold cursor-pointer hover:bg-[#555] transition-colors` |
| button disabled | `disabled:bg-gray-400 disabled:cursor-not-allowed` |

**폼 제출 동작**:
TrainingForm과 동일한 패턴:
1. `onSubmit` → `e.preventDefault()`, `setStatus("submitting")`
2. `fetch("https://formspree.io/f/mblgvker", { method: "POST", headers: { Accept: "application/json" }, body: new FormData(e.currentTarget) })`
3. 성공 → `setStatus("success")`, 폼 리셋
4. 실패 → `setStatus("error")`

**상태 메시지**:
- `submitting`: 버튼 텍스트 "전송 중..." + disabled
- `success`: 녹색 "케이터링 서비스 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다."
- `error`: 빨간 "전송 중 오류가 발생했습니다. 다시 시도해 주세요."

**폼 필드**:

| Field | id | name | type | required | placeholder |
|-------|-----|------|------|----------|-------------|
| 이름 | `catering_name` | `name` | text | Yes | - |
| 이메일 | `catering_email` | `email` | email | Yes | - |
| 행사 날짜 | `catering_date` | `date` | date | No | - |
| 요청 사항 | `catering_message` | `message` | textarea | No | `예: 30명 규모 / 핸드드립 2시간 운영 / 1인당 1잔` |

## 4. Catering Data (`lib/catering-data.ts`)

```typescript
import { CateringMenuItem } from "@/types";

export const CATERING_MENU: CateringMenuItem[] = [
  {
    id: "espresso",
    name: "에스프레소",
    image: "/images/espresso.png",
    alt: "에스프레소",
    description: "깊은 향미의 에스프레소 커피",
  },
  {
    id: "drip-coffee",
    name: "드립커피",
    image: "/images/dripcoffee.png",
    alt: "드립커피",
    description: "고객의 취향에 맞춤 드립 커피",
  },
  {
    id: "cold-brew",
    name: "콜드브루",
    image: "/images/coldbrew.png",
    alt: "콜드브루",
    description: "부드럽고 깊은 맛의 콜드브루",
  },
  {
    id: "coffee-bag",
    name: "커피백",
    image: "/images/coffeebag.JPG",
    alt: "커피백",
    description: "언제 어디서나 동일한 즐길 수 있는 커피백",
  },
  {
    id: "almond-cookie",
    name: "아몬드 쿠키",
    image: "/images/almond-cookie.png",
    alt: "아몬드 쿠키",
    description: "고소한 아몬드의 풍미를 담은 쿠키,1883년 오스트리아 빈 유래",
  },
  {
    id: "meringue-cookie",
    name: "머랭 쿠키",
    image: "/images/meringue-cookie.png",
    alt: "머랭 쿠키",
    description: "코코넛, 바나나를 곁들인 머랭 쿠키",
  },
  {
    id: "choco-cookie",
    name: "초코쿠키",
    image: "/images/choco-cookie.png",
    alt: "초코쿠키",
    description: "달콤한 초콜릿이 가득한 전통적인 쿠키",
  },
  {
    id: "tiramisu",
    name: "티라미수",
    image: "/images/tiramisu.png",
    alt: "티라미수",
    description: "커피와 조화로운 이탈리아식 고급 디저트",
  },
];
```

## 5. Page Composition (`app/catering/page.tsx`)

```typescript
import { Metadata } from "next";
import { PageHero } from "@/components/features/PageHero";
import { CATERING_MENU } from "@/lib/catering-data";
import { MenuItem } from "@/components/features/MenuItem";
import { CateringForm } from "@/components/features/CateringForm";

export const metadata: Metadata = {
  title: "케이터링 서비스 - (주)씨앤씨테크",
  description: "커피 케이터링, 디저트 케이터링 서비스 - 씨앤씨테크",
};

export default function CateringPage() {
  return (
    <>
      <PageHero
        backgroundImage="/images/catering-banner.png"
        title="케이터링 서비스"
      />
      <main className="max-w-[1000px] mx-auto py-10 px-5">
        <h2 className="text-center mb-8">메뉴 소개</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {CATERING_MENU.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </main>

      {/* CTA Button */}
      <section className="text-center mt-16">
        <a
          href="#catering-form"
          className="inline-block bg-[#333] text-white px-6 py-3 rounded-md no-underline hover:bg-[#555] transition-colors"
        >
          케이터링 문의하기
        </a>
      </section>

      <CateringForm />
    </>
  );
}
```

## 6. Image Assets

### 6.1 복사 대상 (isonglobal/images/ → cnc-home/public/images/)

| 파일명 | 용도 |
|--------|------|
| `catering-banner.png` | 페이지 히어로 배경 |
| `espresso.png` | 에스프레소 메뉴 카드 |
| `dripcoffee.png` | 드립커피 메뉴 카드 |
| `coldbrew.png` | 콜드브루 메뉴 카드 |
| `coffeebag.JPG` | 커피백 메뉴 카드 |
| `almond-cookie.png` | 아몬드 쿠키 메뉴 카드 |
| `meringue-cookie.png` | 머랭 쿠키 메뉴 카드 |
| `choco-cookie.png` | 초코쿠키 메뉴 카드 |
| `tiramisu.png` | 티라미수 메뉴 카드 |

**총 9개 파일** (참고: `coffeebag.JPG` 대소문자 유지)

## 7. Implementation Order

| Step | Task | File | Type |
|------|------|------|------|
| 1 | 케이터링 이미지 에셋 복사 (9개) | `public/images/` | Asset |
| 2 | CateringMenuItem 타입 추가 | `types/index.ts` | Type |
| 3 | 메뉴 데이터 상수 정의 | `lib/catering-data.ts` | Data |
| 4 | MenuItem 컴포넌트 생성 | `components/features/MenuItem.tsx` | Server Component |
| 5 | CateringForm 컴포넌트 생성 | `components/features/CateringForm.tsx` | Client Component |
| 6 | Catering 페이지 조합 | `app/catering/page.tsx` | Page |
| 7 | 빌드 검증 | `npm run build` | Verify |

## 8. Verification Checklist

- [ ] 히어로 배너에 catering-banner.png 배경 + "케이터링 서비스" 타이틀
- [ ] "메뉴 소개" 섹션 타이틀 표시
- [ ] 8개 메뉴 아이템 카드가 그리드로 표시됨
- [ ] 각 카드에 이미지 (rounded-lg), 이름, 설명 표시
- [ ] 반응형 그리드: 2열 → sm:3열 → lg:4열
- [ ] "케이터링 문의하기" CTA 버튼 → `#catering-form` 앵커 스크롤
- [ ] 폼 섹션에 `id="catering-form"` 설정
- [ ] 서비스 안내 텍스트 (250분, 맞춤 변경) 표시
- [ ] 폼 4개 필드: 이름*, 이메일*, 행사 날짜, 요청 사항
- [ ] 행사 날짜 필드가 `type="date"`
- [ ] 폼 제출이 Formspree로 전송됨
- [ ] 제출 성공 시 녹색 메시지, 실패 시 빨간 메시지
- [ ] 제출 중 버튼 disabled + "전송 중..."
- [ ] 모든 이미지 next/image 사용 + alt 태그
- [ ] label-input id 연결 (접근성)
- [ ] `npm run build` 성공

---

*Created: 2026-02-10*
*Feature: catering-page*
*Phase: Design*
