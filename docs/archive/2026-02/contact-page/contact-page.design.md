# Design: contact-page

> (주)씨앤씨테크 문의/신청 페이지 상세 설계

## 1. Component Architecture

```
src/
├── app/contact/
│   └── page.tsx                    # Contact 페이지 (Server Component)
├── components/features/
│   ├── PageHero.tsx                # 기존 재사용 (Server Component)
│   ├── ContactTabs.tsx             # 탭 전환 UI (Client Component)
│   ├── OrderForm.tsx               # 주문 신청 폼 (Client Component)
│   ├── CateringForm.tsx            # 케이터링 신청 폼 (Client Component)
│   └── ContactInfo.tsx             # 연락처 정보 (Server Component)
├── lib/
│   ├── bkend.ts                    # 기존 BaaS 클라이언트 재사용
│   └── contact-data.ts            # 연락처 정보 상수
└── types/
    └── index.ts                    # InquiryFormData 인터페이스 추가
```

## 2. Type Definitions

### 2.1 Inquiry Interface (`types/index.ts`에 추가)

```typescript
export interface InquiryFormData {
  type: "order" | "catering";
  name: string;
  email: string;
  date?: string;
  message?: string;
}
```

### 2.2 Contact Info Interface (`lib/contact-data.ts`)

```typescript
export interface ContactItem {
  icon: string;
  label: string;
  value: string;
}
```

## 3. Component Specifications

### 3.1 PageHero (기존 재사용)

**파일**: `src/components/features/PageHero.tsx` (변경 없음)

기존 contact.html에는 히어로 배너가 없으나, 다른 페이지(products, training, catering, b2b)와 일관성을 위해 PageHero를 사용합니다.

**사용 방식**:
```tsx
<PageHero
  backgroundImage="/images/slide3.png"
  title="문의 / 신청"
/>
```

- 배경 이미지: `/images/slide3.png` (기존 히어로 슬라이드 이미지 재사용)
- 타이틀: `"문의 / 신청"`

### 3.2 ContactTabs (Client Component)

**파일**: `src/components/features/ContactTabs.tsx`

**"use client"** 필요: 탭 전환 useState 사용

**Props**: 없음

**State**:
```typescript
const [activeTab, setActiveTab] = useState<"order" | "catering">("order");
```

**렌더링**:
```
┌──────────────────────────────────────────────┐
│       [주문 신청]    [케이터링 신청]            │
├──────────────────────────────────────────────┤
│                                               │
│    ┌──────────────────────────────────────┐   │
│    │         (선택된 폼 렌더링)             │   │
│    │         OrderForm 또는                │   │
│    │         CateringForm                  │   │
│    └──────────────────────────────────────┘   │
│                                               │
└──────────────────────────────────────────────┘
```

**Tailwind 매핑** (기존 CSS → Tailwind):

| CSS (contact.html) | Tailwind |
|---------------------|----------|
| `.toggle-buttons { text-align: center; margin-bottom: 30px; }` | `text-center mb-8` |
| `button { padding: 10px 20px; margin: 0 10px; font-size: 1rem; }` | `px-5 py-2.5 mx-2 text-base` |
| `button { background: #eee; border: none; border-radius: 8px; cursor: pointer; }` | `bg-[#eee] border-none rounded-lg cursor-pointer` |
| `button.active { background: #333; color: #fff; }` | `bg-[#333] text-white` |

**전체 탭 버튼 클래스**:
- 기본: `px-5 py-2.5 mx-2 text-base border-none rounded-lg cursor-pointer transition-colors`
- 활성: `bg-[#333] text-white`
- 비활성: `bg-[#eee] text-[#333] hover:bg-[#ddd]`

**동작**:
1. 탭 버튼 클릭 → `setActiveTab("order" | "catering")`
2. `activeTab === "order"` → `<OrderForm />` 렌더링
3. `activeTab === "catering"` → `<CateringForm />` 렌더링

**접근성**:
- 탭 컨테이너: `role="tablist"`
- 탭 버튼: `role="tab"`, `aria-selected={boolean}`
- 탭 패널: `role="tabpanel"`

### 3.3 OrderForm (Client Component)

**파일**: `src/components/features/OrderForm.tsx`

**"use client"** 필요: 폼 상태/제출 처리

**Props**: 없음

**State**:
```typescript
const [formData, setFormData] = useState({ name: "", email: "", message: "" });
const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
```

**렌더링**:
```
┌──────────────────────────────────────┐
│            주문 신청                   │
│                                       │
│  이름                                 │
│  ┌─────────────────────────────────┐ │
│  │                                 │ │
│  └─────────────────────────────────┘ │
│                                       │
│  이메일                               │
│  ┌─────────────────────────────────┐ │
│  │                                 │ │
│  └─────────────────────────────────┘ │
│                                       │
│  원하는 주문 내용                      │
│  ┌─────────────────────────────────┐ │
│  │ 예: 아폴로 1kg / 월 2회 배송 희망 │ │
│  │                                 │ │
│  │                                 │ │
│  └─────────────────────────────────┘ │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │           신청하기               │ │
│  └─────────────────────────────────┘ │
│                                       │
│  (성공/에러 메시지 영역)              │
└──────────────────────────────────────┘
```

**Tailwind 매핑** (기존 CSS → Tailwind):

| CSS (contact.html) | Tailwind |
|---------------------|----------|
| `.form-container { max-width: 600px; margin: 0 auto 50px; }` | `max-w-[600px] mx-auto mb-12` |
| `padding: 30px` | `p-8` |
| `background: #fdfdfd` | `bg-[#fdfdfd]` |
| `box-shadow: 0 4px 12px rgba(0,0,0,0.1)` | `shadow-lg` |
| `border-radius: 12px` | `rounded-xl` |
| `h2 { text-align: center; margin-bottom: 20px; }` | `text-center text-xl font-bold mb-5` |
| `label { display: block; margin-top: 15px; font-weight: bold; }` | `block mt-4 font-bold text-[#333]` |
| `input, textarea { width: 100%; padding: 10px; margin-top: 5px; }` | `w-full p-2.5 mt-1` |
| `border-radius: 6px; border: 1px solid #ccc` | `rounded-md border border-[#ccc]` |
| `button[type="submit"] { margin-top: 20px; width: 100%; padding: 12px; }` | `mt-5 w-full py-3` |
| `background: #333; color: white; border: none; border-radius: 6px; cursor: pointer` | `bg-[#333] text-white border-none rounded-md cursor-pointer` |

**폼 필드**:

| 필드 | type | name | required | placeholder |
|------|------|------|:--------:|-------------|
| 이름 | `text` | `name` | yes | - |
| 이메일 | `email` | `email` | yes | - |
| 원하는 주문 내용 | `textarea` (rows=5) | `message` | no | `"예: 아폴로 1kg / 월 2회 배송 희망"` |

**제출 동작**:
```typescript
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setStatus("submitting");
  try {
    await bkend.data.create("inquiries", {
      type: "order",
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });
    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
  } catch {
    setStatus("error");
  }
}
```

**상태 피드백**:
- `submitting`: 버튼 텍스트 `"전송 중..."`, `disabled` 속성 추가, `opacity-50 cursor-not-allowed`
- `success`: 폼 아래 `text-green-600` 메시지 `"신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다."`
- `error`: 폼 아래 `text-red-600` 메시지 `"전송에 실패했습니다. 다시 시도해주세요."`

**호버 효과** (submit 버튼):
- `hover:bg-[#555] transition-colors`
- disabled일 때 hover 효과 없음

**input focus 스타일**:
- `focus:outline-none focus:ring-2 focus:ring-[#333] focus:border-transparent`

### 3.4 CateringForm (Client Component)

**파일**: `src/components/features/CateringForm.tsx`

**"use client"** 필요: 폼 상태/제출 처리

**Props**: 없음

**State**:
```typescript
const [formData, setFormData] = useState({ name: "", email: "", date: "", message: "" });
const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
```

**렌더링**:
```
┌──────────────────────────────────────┐
│          케이터링 신청                 │
│                                       │
│  이름                                 │
│  ┌─────────────────────────────────┐ │
│  │                                 │ │
│  └─────────────────────────────────┘ │
│                                       │
│  이메일                               │
│  ┌─────────────────────────────────┐ │
│  │                                 │ │
│  └─────────────────────────────────┘ │
│                                       │
│  행사 날짜                            │
│  ┌─────────────────────────────────┐ │
│  │ 📅 yyyy-mm-dd                   │ │
│  └─────────────────────────────────┘ │
│                                       │
│  요청 사항                            │
│  ┌─────────────────────────────────┐ │
│  │ 예: 30명 규모 / 핸드드립 2시간   │ │
│  │ 운영 / 1인당 1잔                 │ │
│  │                                 │ │
│  └─────────────────────────────────┘ │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │        케이터링 신청             │ │
│  └─────────────────────────────────┘ │
│                                       │
│  (성공/에러 메시지 영역)              │
└──────────────────────────────────────┘
```

**Tailwind 매핑**: OrderForm과 동일한 스타일 적용

**폼 필드**:

| 필드 | type | name | required | placeholder |
|------|------|------|:--------:|-------------|
| 이름 | `text` | `name` | yes | - |
| 이메일 | `email` | `email` | yes | - |
| 행사 날짜 | `date` | `date` | yes | - |
| 요청 사항 | `textarea` (rows=5) | `message` | no | `"예: 30명 규모 / 핸드드립 2시간 운영 / 1인당 1잔"` |

**제출 동작**:
```typescript
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setStatus("submitting");
  try {
    await bkend.data.create("inquiries", {
      type: "catering",
      name: formData.name,
      email: formData.email,
      date: formData.date,
      message: formData.message,
    });
    setStatus("success");
    setFormData({ name: "", email: "", date: "", message: "" });
  } catch {
    setStatus("error");
  }
}
```

**상태 피드백**: OrderForm과 동일한 패턴
- `submitting`: 버튼 텍스트 `"전송 중..."`, disabled
- `success`: `"케이터링 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다."`
- `error`: `"전송에 실패했습니다. 다시 시도해주세요."`

### 3.5 ContactInfo (Server Component)

**파일**: `src/components/features/ContactInfo.tsx`

**Server Component**: 정적 데이터만 표시 (directive 불필요)

**렌더링**:
```
┌──────────────────────────────────────┐
│           연락처 정보                  │
│                                       │
│  📧 이메일: 4everlll@naver.com       │
│  📞 전화: 02-371-3771               │
│  📍 주소: 경기도 고양시 ...           │
│  🕘 운영 시간: 평일 오전 8시~오후 5시 │
└──────────────────────────────────────┘
```

**Tailwind 매핑** (기존 CSS → Tailwind):

| CSS (Subscription Form.html) | Tailwind |
|-------------------------------|----------|
| `.contact-info { margin-top: 40px; }` | `mt-10` |
| `font-size: 0.95rem` | `text-[15px]` |
| `line-height: 1.6` | `leading-relaxed` |
| `color: #444` | `text-[#444]` |

**전체 섹션 클래스**: `max-w-[600px] mx-auto mt-10 p-8 bg-[#fdfdfd] shadow-lg rounded-xl`

**제목 클래스**: `text-center text-xl font-bold mb-5 text-[#333]`

**각 항목 클래스**: `flex items-start gap-3 mb-3 text-[15px] leading-relaxed text-[#444]`

**아이콘 표현**: 텍스트 이모지 대신 span으로 감싼 텍스트 아이콘 사용

**데이터 소스**: `lib/contact-data.ts`에서 상수 import

## 4. Contact Data (`lib/contact-data.ts`)

```typescript
export const CONTACT_INFO = {
  email: "4everlll@naver.com",
  phone: "02-371-3771",
  address: "경기도 고양시 덕양구 오금동 686 (삼막5길5) 삼송한강듀클래스지식산업센터 402호",
  hours: "평일 오전 8시 ~ 오후 5시",
} as const;

export const CONTACT_ITEMS = [
  { icon: "📧", label: "이메일", value: CONTACT_INFO.email },
  { icon: "📞", label: "전화", value: CONTACT_INFO.phone },
  { icon: "📍", label: "주소", value: CONTACT_INFO.address },
  { icon: "🕘", label: "운영 시간", value: CONTACT_INFO.hours },
] as const;
```

## 5. Page Composition (`app/contact/page.tsx`)

```typescript
import { Metadata } from "next";
import { PageHero } from "@/components/features/PageHero";
import { ContactTabs } from "@/components/features/ContactTabs";
import { ContactInfo } from "@/components/features/ContactInfo";

export const metadata: Metadata = {
  title: "문의 / 신청 - (주)씨앤씨테크",
  description: "커피 주문 신청 및 케이터링 문의 - (주)씨앤씨테크",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        backgroundImage="/images/slide3.png"
        title="문의 / 신청"
      />
      <main className="max-w-[1000px] mx-auto my-10 px-5">
        <ContactTabs />
        <ContactInfo />
      </main>
    </>
  );
}
```

## 6. bkend.ai Data Integration

### 6.1 테이블: `inquiries`

| Column | Type | Required | Description |
|--------|------|:--------:|-------------|
| id | uuid | auto | PK (bkend.ai 자동 생성) |
| type | string | yes | `"order"` 또는 `"catering"` |
| name | string | yes | 신청자 이름 |
| email | string | yes | 신청자 이메일 |
| date | string | no | 케이터링 희망 날짜 (케이터링만) |
| message | string | no | 상세 내용 |
| created_at | timestamp | auto | 생성 시간 (bkend.ai 자동) |

### 6.2 API 호출

기존 `bkend.ts` 클라이언트의 `bkend.data.create` 사용:

```typescript
// 주문 신청
await bkend.data.create("inquiries", {
  type: "order",
  name: "홍길동",
  email: "hong@email.com",
  message: "아폴로 1kg / 월 2회 배송 희망",
});

// 케이터링 신청
await bkend.data.create("inquiries", {
  type: "catering",
  name: "홍길동",
  email: "hong@email.com",
  date: "2026-03-15",
  message: "30명 규모 / 핸드드립 2시간 운영",
});
```

### 6.3 에러 핸들링

- bkend.ai API 미설정 시: try-catch로 에러 메시지 표시
- 네트워크 오류: 일반 에러 메시지 표시
- 중복 제출 방지: `status === "submitting"` 동안 버튼 disabled

## 7. Implementation Order

| Step | Task | File | Type |
|------|------|------|------|
| 1 | InquiryFormData 타입 추가 | `src/types/index.ts` | Type |
| 2 | 연락처 데이터 상수 | `src/lib/contact-data.ts` | Data |
| 3 | ContactInfo 컴포넌트 | `src/components/features/ContactInfo.tsx` | Server Component |
| 4 | OrderForm 컴포넌트 | `src/components/features/OrderForm.tsx` | Client Component |
| 5 | CateringForm 컴포넌트 | `src/components/features/CateringForm.tsx` | Client Component |
| 6 | ContactTabs 컴포넌트 | `src/components/features/ContactTabs.tsx` | Client Component |
| 7 | Contact 페이지 조합 | `src/app/contact/page.tsx` | Page |
| 8 | 빌드 검증 | `npm run build` | Verify |

## 8. Verification Checklist

### 콘텐츠 매칭
- [ ] PageHero에 slide3.png 배경 + "문의 / 신청" 타이틀
- [ ] 2개 탭 버튼 표시: "주문 신청", "케이터링 신청"
- [ ] 탭 클릭 시 폼 전환 동작
- [ ] 주문 신청 폼: 이름 (required), 이메일 (required), 원하는 주문 내용 (textarea)
- [ ] 케이터링 신청 폼: 이름 (required), 이메일 (required), 행사 날짜 (required, date), 요청 사항 (textarea)
- [ ] 주문 폼 placeholder: "예: 아폴로 1kg / 월 2회 배송 희망"
- [ ] 케이터링 폼 placeholder: "예: 30명 규모 / 핸드드립 2시간 운영 / 1인당 1잔"
- [ ] 주문 폼 제출 버튼: "신청하기"
- [ ] 케이터링 폼 제출 버튼: "케이터링 신청"

### 연락처 정보
- [ ] 이메일: 4everlll@naver.com
- [ ] 전화: 02-371-3771
- [ ] 주소: 경기도 고양시 덕양구 오금동 686 (삼막5길5) 삼송한강듀클래스지식산업센터 402호
- [ ] 운영 시간: 평일 오전 8시 ~ 오후 5시

### 기능
- [ ] 폼 제출 시 bkend.ai `inquiries` 테이블에 데이터 저장 (bkend.data.create)
- [ ] 제출 중 버튼 "전송 중..." + disabled 상태
- [ ] 성공 시 초록색 성공 메시지 표시 + 폼 초기화
- [ ] 실패 시 빨간색 에러 메시지 표시
- [ ] 필수 필드 미입력 시 HTML5 기본 검증

### 접근성
- [ ] 탭: role="tablist", role="tab", aria-selected, role="tabpanel"
- [ ] label과 input 연결 (htmlFor/id)
- [ ] 키보드 탐색 가능

### 스타일
- [ ] 폼 컨테이너: max-w-[600px], shadow-lg, rounded-xl
- [ ] 탭 활성: bg-[#333] text-white
- [ ] 탭 비활성: bg-[#eee] + hover:bg-[#ddd]
- [ ] Submit 버튼: bg-[#333] + hover:bg-[#555]
- [ ] Input focus: ring-2 ring-[#333]
- [ ] 반응형: 모바일 (768px 이하) 정상 레이아웃

### 빌드
- [ ] `npm run build` 성공 (0 errors)
- [ ] `npm run lint` 통과

### SEO
- [ ] title: "문의 / 신청 - (주)씨앤씨테크"
- [ ] description: "커피 주문 신청 및 케이터링 문의 - (주)씨앤씨테크"

---

*Created: 2026-02-11*
*Feature: contact-page*
*Phase: Design*
