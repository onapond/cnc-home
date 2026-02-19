# Plan: products-page

> (주)씨앤씨테크 제품 소개 페이지 마이그레이션

## 1. Feature Overview

### 1.1 Summary
기존 정적 HTML 사이트의 제품 소개 페이지(`products.html`)를 Next.js App Router + Tailwind CSS로 마이그레이션합니다. 3개 카테고리 탭(에스프레소/싱글오리진/스페셜티 커피백)과 제품 카드 그리드, 이미지 호버 효과를 포함합니다.

### 1.2 Background
- 기존 페이지: 인라인 CSS + Vanilla JS 탭 전환 + 이미지 호버 스크립트
- 제품 데이터가 HTML에 하드코딩되어 관리 어려움
- 목표: 컴포넌트 기반으로 재구성하여 향후 bkend.ai 연동 시 동적 데이터 전환 용이하게 함

### 1.3 Goal
- 기존 제품 소개 페이지의 모든 콘텐츠를 1:1 마이그레이션
- 3개 탭 카테고리 UI 구현 (에스프레소/싱글오리진/커피백)
- 제품 카드 그리드 + 이미지 호버 효과
- 페이지 히어로 배너
- 네이버 스마트스토어 외부 링크 (커피백 "구매하기" 버튼)

## 2. Requirements

### 2.1 Functional Requirements

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| FR-01 | 페이지 히어로 배너 | Must | 배경 이미지(`productsimg.png`) + "good coffee makes a good day" 타이틀 |
| FR-02 | 페이지 소개 텍스트 | Must | SEAR 테크닉 기반 제품 안내 문구 |
| FR-03 | 3개 카테고리 탭 | Must | 에스프레소 커피 / 싱글오리진 커피 / 스페셜티 커피백 |
| FR-04 | 에스프레소 제품 카드 (5개) | Must | 아폴로, 피닉스, 베누스, 아레스, 커스텀 - 각각 이미지, 상세 정보 |
| FR-05 | 싱글오리진 제품 카드 (4개) | Must | 에티오피아, 케냐, 과테말라, 브라질 - 각각 이미지, 상세 정보 |
| FR-06 | 커피백 제품 카드 (4개) | Must | 에티오피아/케냐/과테말라 커피백 + 세트 - "구매하기" 외부 링크 |
| FR-07 | 이미지 호버 효과 | Should | 제품 이미지 마우스오버 시 라벨 이미지로 전환 |
| FR-08 | 반응형 그리드 | Must | 제품 카드 반응형 그리드 레이아웃 |

### 2.2 Non-Functional Requirements

| ID | Requirement | Description |
|----|-------------|-------------|
| NFR-01 | 이미지 최적화 | next/image 사용, 대량 이미지 lazy loading |
| NFR-02 | 접근성 | 탭 키보드 접근성, 이미지 alt 태그 |
| NFR-03 | SEO | 시맨틱 HTML, 페이지별 메타데이터 |

## 3. Scope

### 3.1 In Scope
- `/products` 라우트 페이지 생성
- 페이지 히어로 배너 컴포넌트
- 탭 UI 컴포넌트 (3개 카테고리)
- 제품 카드 컴포넌트 (13개 제품 데이터)
- 이미지 호버 효과
- 제품 이미지 에셋 복사 (약 25개 파일)
- 네이버 스마트스토어 외부 링크

### 3.2 Out of Scope
- bkend.ai 연동 (제품 데이터 동적 관리)
- 장바구니/결제 기능
- 제품 상세 페이지 (별도 feature)
- 검색/필터 기능

## 4. Technical Approach

### 4.1 Component Structure

```
src/
├── app/
│   └── products/
│       └── page.tsx              # Products page
├── components/
│   └── features/
│       ├── PageHero.tsx          # 재사용 가능한 페이지 히어로 배너
│       ├── ProductTabs.tsx       # 탭 UI (Client Component)
│       └── ProductCard.tsx       # 제품 카드 (이미지 호버 포함)
└── public/
    └── images/
        └── products/             # 제품 이미지 (기존 images/에서 정리)
```

### 4.2 Key Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| 탭 UI | Client Component + useState | 사용자 인터랙션 (탭 전환) |
| 이미지 호버 | CSS hover + next/image | JS 이벤트 대신 CSS로 성능 개선 가능 |
| 제품 데이터 | TypeScript 상수 배열 | 추후 bkend.ai 연동 시 데이터 소스만 교체 |
| PageHero | Server Component | 재사용 가능, props로 이미지/텍스트 전달 |
| 이미지 경로 | `public/images/` (기존 구조 유지) | home-page와 동일 구조, 불필요한 이동 방지 |

### 4.3 Product Data Structure

```typescript
interface Product {
  name: string;
  image: string;
  hoverImage?: string;       // 호버 시 표시할 라벨 이미지
  alt: string;
  details: { label: string; value: string }[];
  recommendation?: string;   // 로스터 추천
  buyLink?: string;          // 스마트스토어 구매 링크 (커피백만)
}
```

### 4.4 Image Migration
기존 사이트에서 제품 관련 이미지 복사 (약 25개):
- 에스프레소: `apollo.png`, `apollo_label.png`, `phoenix.png`, `phoenix_label.png`, `venus.png`, `venus_label.png`, `ares.png`, `ares_label.png`, `costom.png`, `costom_label.png`
- 싱글오리진: `ethio.png`, `ethio_label.png`, `kenya.png`, `kenya_label.png`, `guate.png`, `guate_label.png`, `brazil.png`, `brazil_label.png`
- 커피백: `ethio_bag.jpg`, `kenya_bag.jpg`, `guate_bag.jpg`, `coffeebagset.jpg`, `coffeebag_DES.png`
- 배너: `productsimg.png`

## 5. Implementation Order

| Step | Task | Est. Files |
|------|------|-----------|
| 1 | 제품 이미지 에셋 복사 | public/images/* |
| 2 | Product 타입 정의 | types/index.ts |
| 3 | 제품 데이터 상수 정의 | lib/products-data.ts |
| 4 | PageHero 컴포넌트 | PageHero.tsx (재사용) |
| 5 | ProductCard 컴포넌트 | ProductCard.tsx |
| 6 | ProductTabs 컴포넌트 | ProductTabs.tsx |
| 7 | Products 페이지 조합 | products/page.tsx |
| 8 | 빌드 검증 | npm run build |

## 6. Risk & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| 이미지 수량이 많음 (25+개) | 페이지 로드 지연 | lazy loading 기본 적용, 첫 탭 이미지만 priority |
| 호버 이미지 프리로드 | 호버 시 깜빡임 | CSS로 두 이미지 겹쳐 놓고 opacity 전환 |
| 외부 링크 보안 | 보안 취약점 | `rel="noopener noreferrer"` + `target="_blank"` |
| 탭 전환 시 레이아웃 이동 | UX 저하 | 탭 콘텐츠 높이 고정 또는 부드러운 전환 |

## 7. Success Criteria

- [ ] 기존 사이트와 동일한 13개 제품이 표시됨
- [ ] 3개 탭 전환이 정상 동작함
- [ ] 이미지 호버 효과가 동작함
- [ ] 커피백 "구매하기" 버튼이 스마트스토어로 연결됨
- [ ] 반응형 그리드가 모바일/데스크톱에서 정상 작동함
- [ ] 모든 이미지가 next/image로 최적화됨
- [ ] `npm run build` 성공

---

*Created: 2026-02-10*
*Feature: products-page*
*Phase: Plan*
