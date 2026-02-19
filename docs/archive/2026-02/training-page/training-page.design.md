# Design: training-page

> (주)씨앤씨테크 교육 컨설팅 페이지 상세 설계

## 1. Component Architecture

```
src/
├── app/training/
│   └── page.tsx                    # Training 페이지 (Server Component)
├── components/features/
│   ├── PageHero.tsx                # 재사용 (이미 존재)
│   ├── TrainingCard.tsx            # 교육 프로그램 카드 (Server Component)
│   └── TrainingForm.tsx            # 교육 문의 폼 (Client Component)
├── lib/
│   └── training-data.ts           # 교육 프로그램 데이터 상수
└── types/
    └── index.ts                    # TrainingProgram 인터페이스 추가
```

## 2. Type Definitions

### 2.1 TrainingProgram Interface (`types/index.ts`에 추가)

```typescript
export interface TrainingProgram {
  id: string;
  title: string;
  image: string;
  alt: string;
  description: string;
}
```

## 3. Component Specifications

### 3.1 PageHero (재사용 - 이미 존재)

이미 생성된 `PageHero.tsx`를 그대로 재사용합니다.

```typescript
<PageHero
  backgroundImage="/images/training-banner.png"
  title="교육 컨설팅"
/>
```

### 3.2 TrainingCard (Server Component)

**파일**: `src/components/features/TrainingCard.tsx`

**Props**:
```typescript
interface TrainingCardProps {
  program: TrainingProgram;
}
```

**렌더링**:
```
┌────────────────────────┐
│  ┌──────────────────┐  │
│  │  프로그램 이미지   │  │  ← 200px 고정 높이, object-cover
│  └──────────────────┘  │
│  ┌──────────────────┐  │
│  │  프로그램 제목     │  │
│  │  설명 텍스트       │  │
│  └──────────────────┘  │
└────────────────────────┘
   ↑ 호버 시 translateY(-5px) 상승
```

**Tailwind 매핑**:
| CSS (기존) | Tailwind |
|-----------|----------|
| `background-color: #f9f9f9` | `bg-[#f9f9f9]` |
| `border-radius: 8px` | `rounded-lg` |
| `box-shadow: 0 4px 12px rgba(0,0,0,0.08)` | `shadow-md` |
| `overflow: hidden` | `overflow-hidden` |
| `text-align: center` | `text-center` |
| `transition: transform 0.3s` | `transition-transform duration-300` |
| `:hover { transform: translateY(-5px) }` | `hover:-translate-y-1.5` |
| 이미지 `height: 200px; object-fit: cover` | `h-[200px] object-cover` |
| 이미지 `border-bottom: 1px solid #eee` | `border-b border-[#eee]` |
| 콘텐츠 `padding: 20px` | `p-5` |
| 제목 `font-size: 1.3rem; color: #333` | `text-xl font-semibold text-[#333] mb-2.5` |
| 설명 `font-size: 1rem; color: #666` | `text-base text-[#666] leading-relaxed` |

**구현 상세**:
- next/image 사용, `width={400} height={200}` + `className="w-full h-[200px] object-cover"`
- `sizes` 속성: `"(max-width: 768px) 100vw, 33vw"`

### 3.3 TrainingForm (Client Component)

**파일**: `src/components/features/TrainingForm.tsx`

**"use client"** 필요: 폼 제출 상태 관리

**State**:
```typescript
const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
```

**렌더링**:
```
┌──────────────────────────────────────────┐
│         교육 문의 신청                     │
│                                           │
│  이름 *          [________________]       │
│  이메일 *        [________________]       │
│  연락처          [________________]       │
│  희망 교육 과정 * [▼ 선택하세요    ]       │
│  희망 날짜/요일   [________________]       │
│  문의 내용       [                ]       │
│                  [                ]       │
│                  [________________]       │
│                                           │
│  [      교육 상담 신청하기      ]          │
│                                           │
│  ✓ 교육 상담 신청이 완료되었습니다. (성공)  │
│  ✗ 전송 중 오류가 발생했습니다. (실패)      │
└──────────────────────────────────────────┘
```

**Tailwind 매핑**:
| CSS (기존) | Tailwind |
|-----------|----------|
| 컨테이너 `max-width: 800px; margin: 80px auto 40px` | `max-w-[800px] mx-auto mt-20 mb-10 px-5` |
| `background: #fff; border-radius: 8px` | `bg-white rounded-lg` |
| `box-shadow: 0 2px 10px rgba(0,0,0,0.05)` | `shadow-sm` |
| `padding: 40px 20px` | `p-10 px-5 sm:px-10` |
| 제목 `text-align: center; color: #222` | `text-center text-[#222] mb-8` |
| label `font-weight: bold; color: #444` | `block mb-2 font-bold text-[#444]` |
| input `padding: 12px; border: 1px solid #ddd; border-radius: 6px` | `w-full p-3 mb-5 border border-[#ddd] rounded-md text-base` |
| textarea `min-height: 100px; resize: vertical` | `w-full p-3 mb-5 border border-[#ddd] rounded-md text-base min-h-[100px] resize-y` |
| button `background: #007bff; font-weight: bold` | `w-full p-4 bg-blue-500 text-white border-none rounded-md text-lg font-bold cursor-pointer hover:bg-blue-700 transition-colors` |
| button disabled | `disabled:bg-gray-400 disabled:cursor-not-allowed` |

**폼 제출 동작**:
1. `onSubmit` → `e.preventDefault()`, `setStatus("submitting")`
2. `fetch("https://formspree.io/f/mblgvker", { method: "POST", headers: { Accept: "application/json" }, body: new FormData(e.target) })`
3. 성공 → `setStatus("success")`, 폼 리셋
4. 실패 → `setStatus("error")`

**상태 메시지**:
- `submitting`: 버튼 텍스트 "전송 중..." + disabled
- `success`: 녹색 메시지 "교육 상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다."
- `error`: 빨간 메시지 "전송 중 오류가 발생했습니다. 다시 시도해 주세요."

**폼 필드**:

| Field | id | name | type | required | placeholder |
|-------|-----|------|------|----------|-------------|
| 이름 | `training_name` | `name` | text | Yes | - |
| 이메일 | `training_email` | `email` | email | Yes | - |
| 연락처 | `training_phone` | `phone` | text | No | `예: 010-1234-5678` |
| 희망 교육 과정 | `training_class` | `class_interest` | select | Yes | `선택하세요` |
| 희망 날짜/요일 | `training_date_pref` | `date_preference` | text | No | `예: 주말, 평일 저녁, 7월 중` |
| 문의 내용 | `training_message` | `message` | textarea | No | `궁금한 점이나 특별히 요청할 사항을 자세히 적어주세요.` |

**Select 옵션**:
```typescript
const CLASS_OPTIONS = [
  { value: "", label: "선택하세요" },
  { value: "SCA 교육", label: "SCA 바리스타, 브루잉, 로스팅 교육" },
  { value: "Coffieology 교육", label: "Coffieology 교육" },
  { value: "Konditorei 클래스", label: "Konditorei (독일 베이커리) 클래스" },
  { value: "One Day 클래스", label: "One Day 클래스 (커피, 베이커리)" },
  { value: "매장 바리스타 교육", label: "매장 바리스타 교육" },
  { value: "카페 메뉴 & 운영 컨설팅", label: "카페 메뉴 & 운영 컨설팅" },
  { value: "기타", label: "기타" },
];
```

**접근성**:
- 모든 input에 `id` + `<label htmlFor>` 연결
- required 필드에 `required` 속성
- 버튼 disabled 상태에서 `aria-disabled="true"`

## 4. Training Data (`lib/training-data.ts`)

```typescript
import { TrainingProgram } from "@/types";

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: "sca",
    title: "SCA 교육",
    image: "/images/sca-barista.png",
    alt: "SCA 바리스타 교육",
    description: "세계 스페셜티 커피 협회(SCA)의 공인된 교육 과정을 통해 전문 바리스타, 브루잉 마스터, 로스터로 성장할 수 있습니다.",
  },
  {
    id: "coffieology",
    title: "Coffieology 교육",
    image: "/images/coffieology.png",
    alt: "Coffieology 교육",
    description: "커피의 과학과 예술을 깊이 탐구하는 코피올로지 교육으로 커피에 대한 심층적인 이해를 돕습니다.",
  },
  {
    id: "konditorei",
    title: "Konditorei (독일 베이커리) 클래스",
    image: "/images/konditorei.png",
    alt: "Konditorei (독일 베이커리) 클래스",
    description: "독일 전통 베이킹 기술과 레시피를 배우는 콘디토라이 클래스에서 정통 유럽 베이커리의 진수를 경험하세요.",
  },
  {
    id: "one-day",
    title: "One Day 클래스 (커피, 베이커리)",
    image: "/images/one-day-class.png",
    alt: "One Day 클래스 (커피, 베이커리)",
    description: "커피 추출의 기본부터 간단한 베이킹까지 짧은 시간 안에 핵심을 배우는 흥미로운 원데이 클래스입니다.",
  },
  {
    id: "store-barista",
    title: "매장 바리스타 교육",
    image: "/images/store-barista.png",
    alt: "매장 바리스타 교육",
    description: "실제 매장 운영에 필요한 바리스타 기술, 고객 서비스, 위생 관리 등 실무 중심의 교육을 제공합니다.",
  },
  {
    id: "cafe-consulting",
    title: "카페 메뉴 & 운영 컨설팅",
    image: "/images/cafe-consulting.png",
    alt: "카페 메뉴 & 운영 컨설팅",
    description: "성공적인 카페 창업 및 운영을 위한 맞춤형 메뉴 개발, 효율적인 공간 활용, 마케팅 전략 등 전반적인 컨설팅을 제공합니다.",
  },
];
```

## 5. Page Composition (`app/training/page.tsx`)

```typescript
import { Metadata } from "next";
import { PageHero } from "@/components/features/PageHero";
import { TRAINING_PROGRAMS } from "@/lib/training-data";
import { TrainingCard } from "@/components/features/TrainingCard";
import { TrainingForm } from "@/components/features/TrainingForm";

export const metadata: Metadata = {
  title: "교육 컨설팅 - (주)씨앤씨테크",
  description: "SCA 공인 교육, 바리스타 교육, 카페 컨설팅 - 씨앤씨테크",
};

export default function TrainingPage() {
  return (
    <>
      <PageHero
        backgroundImage="/images/training-banner.png"
        title="교육 컨설팅"
      />
      <main className="max-w-[1000px] mx-auto py-10 px-5">
        <h2 className="text-center mb-8">(주)씨앤씨테크 교육 프로그램</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAINING_PROGRAMS.map((program) => (
            <TrainingCard key={program.id} program={program} />
          ))}
        </div>
      </main>
      <hr />
      <TrainingForm />
    </>
  );
}
```

## 6. Image Assets

### 6.1 복사 대상 (isonglobal/images/ → cnc-home/public/images/)

| 파일명 | 용도 |
|--------|------|
| `training-banner.png` | 페이지 히어로 배경 |
| `sca-barista.png` | SCA 교육 카드 |
| `coffieology.png` | Coffieology 교육 카드 |
| `konditorei.png` | Konditorei 클래스 카드 |
| `one-day-class.png` | One Day 클래스 카드 |
| `store-barista.png` | 매장 바리스타 교육 카드 |
| `cafe-consulting.png` | 카페 컨설팅 카드 |

**총 7개 파일**

## 7. Implementation Order

| Step | Task | File | Type |
|------|------|------|------|
| 1 | 교육 이미지 에셋 복사 (7개) | `public/images/` | Asset |
| 2 | TrainingProgram 타입 추가 | `types/index.ts` | Type |
| 3 | 교육 데이터 상수 정의 | `lib/training-data.ts` | Data |
| 4 | TrainingCard 컴포넌트 생성 | `components/features/TrainingCard.tsx` | Server Component |
| 5 | TrainingForm 컴포넌트 생성 | `components/features/TrainingForm.tsx` | Client Component |
| 6 | Training 페이지 조합 | `app/training/page.tsx` | Page |
| 7 | 빌드 검증 | `npm run build` | Verify |

## 8. Verification Checklist

- [ ] 히어로 배너에 training-banner.png 배경 + "교육 컨설팅" 타이틀 표시
- [ ] "(주)씨앤씨테크 교육 프로그램" 섹션 타이틀 표시
- [ ] 6개 교육 프로그램 카드가 그리드로 표시됨
- [ ] 각 카드에 이미지 (200px 고정 높이), 제목, 설명 표시
- [ ] 카드 호버 시 상승 효과 (translateY) 동작
- [ ] 반응형 그리드: 데스크톱 3열 → 모바일 1열
- [ ] `<hr>` 구분선 후 교육 문의 폼 표시
- [ ] 폼 6개 필드 모두 표시 (이름*, 이메일*, 연락처, 교육과정*, 날짜, 문의내용)
- [ ] select에 7개 교육 과정 옵션 + 기타
- [ ] 폼 제출이 Formspree로 전송됨
- [ ] 제출 성공 시 녹색 메시지 표시
- [ ] 제출 실패 시 빨간 메시지 표시
- [ ] 제출 중 버튼 disabled + "전송 중..." 텍스트
- [ ] 모든 이미지 next/image 사용 + alt 태그
- [ ] label-input id 연결 (접근성)
- [ ] `npm run build` 성공

---

*Created: 2026-02-10*
*Feature: training-page*
*Phase: Design*
