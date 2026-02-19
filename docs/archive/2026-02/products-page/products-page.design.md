# Design: products-page

> (주)씨앤씨테크 제품 소개 페이지 상세 설계

## 1. Component Architecture

```
src/
├── app/products/
│   └── page.tsx                    # Products 페이지 (Server Component)
├── components/features/
│   ├── PageHero.tsx                # 재사용 페이지 히어로 배너 (Server Component)
│   ├── ProductTabs.tsx             # 탭 UI + 그리드 (Client Component)
│   └── ProductCard.tsx             # 제품 카드 + 이미지 호버 (Server Component)
├── lib/
│   └── products-data.ts           # 제품 데이터 상수
└── types/
    └── index.ts                    # Product 인터페이스 추가
```

## 2. Type Definitions

### 2.1 Product Interface (`types/index.ts`에 추가)

```typescript
export interface ProductDetail {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  hoverImage?: string;
  alt: string;
  details: ProductDetail[];
  recommendation?: string;
  buyLink?: string;
}

export interface ProductCategory {
  id: string;
  label: string;
  intro?: string;
  products: Product[];
}
```

## 3. Component Specifications

### 3.1 PageHero (Server Component)

**파일**: `src/components/features/PageHero.tsx`

**Props**:
```typescript
interface PageHeroProps {
  backgroundImage: string;
  title: string;
  subtitle?: string;
}
```

**렌더링**:
```
┌──────────────────────────────────────────────┐
│              background image                 │
│                                               │
│           "good coffee makes               │
│             a good day"                       │
│                                               │
└──────────────────────────────────────────────┘
```

**Tailwind 매핑**:
| CSS (기존) | Tailwind |
|-----------|----------|
| `width: 100%` | `w-full` |
| `height: 300px` | `h-[300px]` |
| `background: url(...) center/cover` | next/image fill + `object-cover` |
| `display: flex; align-items: center; justify-content: center` | `flex items-center justify-center` |
| `color: #fff` | `text-white` |
| `text-shadow: 0 2px 8px rgba(0,0,0,0.6)` | `drop-shadow-lg` |
| `font-size: 2.5rem` | `text-4xl` |

**구현 상세**:
- `position: relative`로 감싸고 next/image `fill` + `object-cover`로 배경 이미지
- 텍스트는 `absolute` 또는 `relative z-10`으로 이미지 위에 배치
- 재사용 가능: 다른 페이지(training, catering 등)에서도 사용

### 3.2 ProductTabs (Client Component)

**파일**: `src/components/features/ProductTabs.tsx`

**"use client"** 필요: 탭 전환 useState 사용

**Props**: 없음 (데이터를 직접 import)

**State**:
```typescript
const [activeTab, setActiveTab] = useState<string>("espresso");
```

**렌더링**:
```
┌──────────────────────────────────────────────┐
│  [에스프레소 커피]  [싱글오리진 커피]  [스페셜티 커피백]  │
├──────────────────────────────────────────────┤
│  (카테고리 소개 텍스트 - 커피백 탭만)          │
│                                               │
│  ┌────────┐  ┌────────┐  ┌────────┐          │
│  │ Card 1 │  │ Card 2 │  │ Card 3 │          │
│  └────────┘  └────────┘  └────────┘          │
│  ┌────────┐  ┌────────┐                      │
│  │ Card 4 │  │ Card 5 │                      │
│  └────────┘  └────────┘                      │
└──────────────────────────────────────────────┘
```

**Tailwind 매핑**:
| 요소 | Tailwind |
|------|----------|
| 탭 컨테이너 | `text-center mt-10` |
| 탭 버튼 (기본) | `mx-2 px-4 py-2 border-none bg-[#eee] rounded cursor-pointer text-base` |
| 탭 버튼 (활성) | `bg-[#333] text-white` |
| 제품 그리드 | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-[1200px] mx-auto px-4` |
| 카테고리 소개 | `text-center max-w-[800px] mx-auto mt-8 text-[#333] text-base leading-relaxed` |

**동작**:
1. 탭 버튼 클릭 → `setActiveTab(categoryId)`
2. `PRODUCT_CATEGORIES` 배열에서 `activeTab`에 해당하는 카테고리 필터
3. 카테고리에 `intro`가 있으면 그리드 위에 소개 텍스트 렌더링
4. 해당 카테고리의 `products` 배열을 `ProductCard`로 매핑

**접근성**:
- 탭 버튼에 `role="tab"`, `aria-selected` 속성
- 탭 콘텐츠에 `role="tabpanel"`

### 3.3 ProductCard (Component)

**파일**: `src/components/features/ProductCard.tsx`

**Props**:
```typescript
interface ProductCardProps {
  product: Product;
}
```

**렌더링**:
```
┌────────────────────┐
│   ┌──────────────┐ │
│   │  Product Img  │ │  ← 마우스오버 시 라벨 이미지로 전환
│   └──────────────┘ │
│    제품명            │
│   블렌딩: xxx       │
│   로스팅: xxx       │
│   향: xxx           │
│   미: xxx           │
│   바디: xxx         │
│   중량: xxx         │
│   로스터 추천: xxx   │
│   [구매하기]         │  ← buyLink가 있는 경우만
└────────────────────┘
```

**Tailwind 매핑**:
| CSS (기존) | Tailwind |
|-----------|----------|
| `background: #fff` | `bg-white` |
| `border-radius: 8px` | `rounded-lg` |
| `box-shadow: 0 2px 8px rgba(0,0,0,0.05)` | `shadow-sm` |
| `overflow: hidden` | `overflow-hidden` |
| `padding: 16px` | `p-4` |
| `text-align: left` | `text-left` |
| 제품명 `font-size: 1.1rem; text-align: center` | `text-center text-lg font-semibold my-3` |
| 상세 `font-size: 0.95rem; color: #555` | `text-sm text-[#555] my-1` |
| 구매 버튼 `background: #007bff` | `inline-block bg-blue-500 text-white px-4 py-2 rounded mt-2.5 hover:bg-blue-700 transition-colors` |

**이미지 호버 효과**:
CSS-only 방식으로 두 이미지를 겹쳐 놓고 opacity 전환:
```
┌─ 이미지 컨테이너 (relative, group) ─────┐
│  [원본 이미지]  opacity-100 → group-hover:opacity-0  │
│  [라벨 이미지]  opacity-0   → group-hover:opacity-100 │
│  transition-opacity duration-300                     │
└────────────────────────────────────────────────────┘
```

- `hoverImage`가 없는 경우: 단일 이미지만 표시
- `hoverImage`가 있는 경우: 두 이미지를 `absolute` 포지셔닝으로 겹침
- `group` 클래스로 카드 전체 호버 감지
- next/image 사용, `object-contain` (원본 비율 유지)

**구매 버튼**:
- `buyLink`가 있는 경우만 렌더링
- `<a href={buyLink} target="_blank" rel="noopener noreferrer">`
- 보안: `rel="noopener noreferrer"` 필수

## 4. Product Data (`lib/products-data.ts`)

### 4.1 에스프레소 커피 (5개)

```typescript
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "espresso",
    label: "에스프레소 커피",
    products: [
      {
        id: "apollo",
        name: "아폴로",
        image: "/images/apollo.png",
        hoverImage: "/images/apollo_label.png",
        alt: "아폴로",
        details: [
          { label: "블렌딩", value: "과테말라, 콜롬비아 외" },
          { label: "로스팅", value: "중강배전 (Full City)" },
          { label: "향", value: "풍부한 초콜렛과 카라멜 향" },
          { label: "미", value: "굿 밸런스" },
          { label: "바디", value: "중 바디" },
          { label: "중량", value: "500g, 1kg" },
        ],
        recommendation: "후미가 깨끗하고 우아한 커피입니다. 우리의 베스트 셀러입니다.",
      },
      {
        id: "phoenix",
        name: "피닉스",
        image: "/images/phoenix.png",
        hoverImage: "/images/phoenix_label.png",
        alt: "피닉스",
        details: [
          { label: "블렌딩", value: "콜롬비아, 에티오피아 외" },
          { label: "로스팅", value: "중강배전 (Full City)" },
          { label: "향", value: "구운 아몬드의 고소함" },
          { label: "미", value: "굿 밸런스" },
          { label: "바디", value: "중강 바디" },
          { label: "중량", value: "500g, 1kg" },
        ],
        recommendation: "은은한 신맛과 다양성이 좋은 커피입니다. 우유/아이스크림과의 하모니가 엑셀렌트합니다.",
      },
      {
        id: "venus",
        name: "베누스",
        image: "/images/venus.png",
        hoverImage: "/images/venus_label.png",
        alt: "베누스",
        details: [
          { label: "블렌딩", value: "에티오피아 100%" },
          { label: "로스팅", value: "중배전 (City)" },
          { label: "향", value: "발효된 과일향" },
          { label: "미", value: "묵직한 산미의 밸런스" },
          { label: "바디", value: "중 바디" },
          { label: "중량", value: "500g, 1kg" },
        ],
        recommendation: "에티오피아의 특유의 과일향과 꽃향이 어우러진 커피입니다. 짙은 향의 라떼를 즐길 수 있습니다.",
      },
      {
        id: "ares",
        name: "아레스",
        image: "/images/ares.png",
        hoverImage: "/images/ares_label.png",
        alt: "아레스",
        details: [
          { label: "블렌딩", value: "브라질, 에티오피아 외" },
          { label: "로스팅", value: "중강배전 (Full City)" },
          { label: "향", value: "비스켓, 토스트" },
          { label: "미", value: "브라운 슈가, 다양성" },
          { label: "바디", value: "중 바디" },
          { label: "중량", value: "500g, 1kg" },
        ],
        recommendation: "대중적이면서도 풍부한 풍미를 지닌 커피입니다. 모두가 즐길 수 있는 커피입니다.",
      },
      {
        id: "custom",
        name: "커스텀",
        image: "/images/costom.png",
        hoverImage: "/images/costom_label.png",
        alt: "커스텀 원두",
        details: [
          { label: "블렌딩", value: "당신이 원하는 블랜딩" },
          { label: "로스팅", value: "당신이 원하는 배전도" },
          { label: "향", value: "당신이 원하는 향" },
          { label: "미", value: "당신이 원하는 맛" },
          { label: "바디", value: "당신이 원하는 바디" },
          { label: "중량", value: "500g, 1kg" },
        ],
        recommendation: "고객이 원하는대로 블랜딩하여 나만의 커피를 만들 수 있습니다. 고객 맞춤형 커피입니다.",
      },
    ],
  },
  {
    id: "single-origin",
    label: "싱글오리진 커피",
    products: [
      {
        id: "ethiopia",
        name: "에티오피아 코케허니 G1",
        image: "/images/ethio.png",
        hoverImage: "/images/ethio_label.png",
        alt: "에티오피아 코케허니",
        details: [
          { label: "향", value: "발효된 살구, 복숭아향, 장미향" },
          { label: "미", value: "은은한 발효된 산미, 굿 밸런스" },
          { label: "바디", value: "중" },
          { label: "중량", value: "200g, 500g" },
        ],
        recommendation: "드립 커피, 콜드브루",
      },
      {
        id: "kenya",
        name: "케냐 AA",
        image: "/images/kenya.png",
        hoverImage: "/images/kenya_label.png",
        alt: "케냐",
        details: [
          { label: "향", value: "다크 초콜릿, 카라멜" },
          { label: "미", value: "굿 밸런스" },
          { label: "바디", value: "강 바디" },
          { label: "중량", value: "200g, 500g" },
        ],
        recommendation: "드립 커피, 콜드브루",
      },
      {
        id: "guatemala",
        name: "과테말라 SHB",
        image: "/images/guate.png",
        hoverImage: "/images/guate_label.png",
        alt: "과테말라",
        details: [
          { label: "향", value: "토스트, 스모키, 넛티" },
          { label: "미", value: "굿 밸런스" },
          { label: "바디", value: "중 바디" },
          { label: "중량", value: "200g, 500g" },
        ],
        recommendation: "드립 커피, 콜드브루",
      },
      {
        id: "brazil",
        name: "브라질 옐로우 버번",
        image: "/images/brazil.png",
        hoverImage: "/images/brazil_label.png",
        alt: "브라질",
        details: [
          { label: "향", value: "브라운 슈가, 헤이즐넛" },
          { label: "미", value: "굿 밸런스" },
          { label: "바디", value: "중 바디" },
          { label: "중량", value: "200g, 500g" },
        ],
        recommendation: "드립 커피, 콜드브루",
      },
    ],
  },
  {
    id: "coffee-bag",
    label: "스페셜티 커피백",
    intro: "즉석에서 간단하게 우려도 바리스타가 만든 것 같은 커피를 맛볼 수 있습니다.\n뜨거운 물에 1분 이상만 우리면 커피 향을 충만하게 즐길 수 있습니다.",
    products: [
      {
        id: "ethio-bag",
        name: "에티오피아 커피백",
        image: "/images/ethio_bag.jpg",
        hoverImage: "/images/coffeebag_DES.png",
        alt: "에티오피아 커피백",
        details: [
          { label: "향", value: "자스민의 꽃향과 살구의 과일향" },
          { label: "미", value: "강한 신맛, 굿 밸런스" },
          { label: "바디", value: "중 바디" },
          { label: "커피백 특징", value: "커피백은 향,미 보존을 위해 질소 포장이 되어있습니다." },
        ],
        buyLink: "https://smartstore.naver.com/isongglobal/products/8148970698",
      },
      {
        id: "kenya-bag",
        name: "케냐 커피백",
        image: "/images/kenya_bag.jpg",
        hoverImage: "/images/coffeebag_DES.png",
        alt: "케냐 커피백",
        details: [
          { label: "향", value: "좋은 당밀과 카라멜 향" },
          { label: "미", value: "블랙 커런트의 신맛, 굿 밸런스" },
          { label: "바디", value: "중 바디" },
          { label: "커피백 특징", value: "커피백은 향,미 보존을 위해 질소 포장이 되어있습니다." },
        ],
        buyLink: "https://smartstore.naver.com/isongglobal/products/8148970698",
      },
      {
        id: "guate-bag",
        name: "과테말라 커피백",
        image: "/images/guate_bag.jpg",
        hoverImage: "/images/coffeebag_DES.png",
        alt: "과테말라 커피백",
        details: [
          { label: "향", value: "아몬드와 호두의 넛티한 향" },
          { label: "미", value: "굿 밸런스" },
          { label: "바디", value: "중 바디" },
          { label: "커피백 특징", value: "커피백은 향,미 보존을 위해 질소 포장이 되어있습니다." },
        ],
        buyLink: "https://smartstore.naver.com/isongglobal/products/8148970698",
      },
      {
        id: "coffee-bag-set",
        name: "커피백 세트",
        image: "/images/coffeebagset.jpg",
        hoverImage: "/images/coffeebag_DES.png",
        alt: "커피백 세트",
        details: [
          { label: "설명", value: "이송글로벌의 좋은 커피백을 좋은 가격에 즐길 수 있는 커피백 세트" },
        ],
        buyLink: "https://smartstore.naver.com/isongglobal/products/9144928295",
      },
    ],
  },
];
```

## 5. Page Composition (`app/products/page.tsx`)

```typescript
import { Metadata } from "next";
import { PageHero } from "@/components/features/PageHero";
import { ProductTabs } from "@/components/features/ProductTabs";

export const metadata: Metadata = {
  title: "제품 소개 - (주)씨앤씨테크",
  description: "SEAR 테크닉 기반 스페셜티 커피 - 에스프레소, 싱글오리진, 커피백",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        backgroundImage="/images/productsimg.png"
        title="good coffee makes a good day"
      />
      <main className="max-w-[1000px] mx-auto my-10 px-5">
        <p className="text-center max-w-[800px] mx-auto text-[#333] text-base leading-relaxed">
          이송 글로벌은 SEAR(Sensitive Espresso Aroma Roasting) 테크닉에 의거하여
          다양한 제품들을 생산하고 있습니다.
          <br />
          한 모금만 마셔도 고객이 다시 찾게 되는 품질의 커피를 만들고 있습니다.
        </p>
        <ProductTabs />
      </main>
    </>
  );
}
```

## 6. Image Assets

### 6.1 복사 대상 (isonglobal/images/ → cnc-home/public/images/)

| 파일명 | 용도 | 카테고리 |
|--------|------|----------|
| `productsimg.png` | 페이지 히어로 배경 | 배너 |
| `apollo.png` | 아폴로 제품 | 에스프레소 |
| `apollo_label.png` | 아폴로 라벨 (호버) | 에스프레소 |
| `phoenix.png` | 피닉스 제품 | 에스프레소 |
| `phoenix_label.png` | 피닉스 라벨 (호버) | 에스프레소 |
| `venus.png` | 베누스 제품 | 에스프레소 |
| `venus_label.png` | 베누스 라벨 (호버) | 에스프레소 |
| `ares.png` | 아레스 제품 | 에스프레소 |
| `ares_label.png` | 아레스 라벨 (호버) | 에스프레소 |
| `costom.png` | 커스텀 제품 | 에스프레소 |
| `costom_label.png` | 커스텀 라벨 (호버) | 에스프레소 |
| `ethio.png` | 에티오피아 제품 | 싱글오리진 |
| `ethio_label.png` | 에티오피아 라벨 (호버) | 싱글오리진 |
| `kenya.png` | 케냐 제품 | 싱글오리진 |
| `kenya_label.png` | 케냐 라벨 (호버) | 싱글오리진 |
| `guate.png` | 과테말라 제품 | 싱글오리진 |
| `guate_label.png` | 과테말라 라벨 (호버) | 싱글오리진 |
| `brazil.png` | 브라질 제품 | 싱글오리진 |
| `brazil_label.png` | 브라질 라벨 (호버) | 싱글오리진 |
| `ethio_bag.jpg` | 에티오피아 커피백 | 커피백 |
| `kenya_bag.jpg` | 케냐 커피백 | 커피백 |
| `guate_bag.jpg` | 과테말라 커피백 | 커피백 |
| `coffeebagset.jpg` | 커피백 세트 | 커피백 |
| `coffeebag_DES.png` | 커피백 라벨 (호버 공용) | 커피백 |

**총 24개 파일** (productsimg.png 포함)

## 7. Implementation Order

| Step | Task | File | Type |
|------|------|------|------|
| 1 | 제품 이미지 에셋 복사 (24개) | `public/images/` | Asset |
| 2 | Product 타입 추가 | `types/index.ts` | Type |
| 3 | 제품 데이터 상수 정의 | `lib/products-data.ts` | Data |
| 4 | PageHero 컴포넌트 생성 | `components/features/PageHero.tsx` | Server Component |
| 5 | ProductCard 컴포넌트 생성 | `components/features/ProductCard.tsx` | Component |
| 6 | ProductTabs 컴포넌트 생성 | `components/features/ProductTabs.tsx` | Client Component |
| 7 | Products 페이지 조합 | `app/products/page.tsx` | Page |
| 8 | 빌드 검증 | `npm run build` | Verify |

## 8. Verification Checklist

- [ ] 히어로 배너에 productsimg.png 배경 + 타이틀 표시
- [ ] 페이지 소개 텍스트 (SEAR 테크닉) 표시
- [ ] 3개 탭 버튼 표시 및 클릭 시 전환 동작
- [ ] 에스프레소 탭: 5개 제품 카드 (아폴로, 피닉스, 베누스, 아레스, 커스텀)
- [ ] 싱글오리진 탭: 4개 제품 카드 (에티오피아, 케냐, 과테말라, 브라질)
- [ ] 커피백 탭: 소개 텍스트 + 4개 제품 카드 (에티오피아/케냐/과테말라 커피백 + 세트)
- [ ] 각 제품 카드에 이미지, 제품명, 상세 정보 표시
- [ ] 이미지 호버 시 라벨 이미지로 전환 (opacity transition)
- [ ] 커피백 카드에 "구매하기" 버튼 → 네이버 스마트스토어 링크
- [ ] 구매 링크에 `target="_blank" rel="noopener noreferrer"` 적용
- [ ] 반응형 그리드: 모바일 1열 → sm 2열 → lg 3열
- [ ] 모든 이미지 next/image 사용 + alt 태그
- [ ] 탭 키보드 접근성 (role, aria 속성)
- [ ] `npm run build` 성공

---

*Created: 2026-02-10*
*Feature: products-page*
*Phase: Design*
