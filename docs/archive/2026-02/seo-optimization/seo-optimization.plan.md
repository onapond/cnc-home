# Plan: SEO 최적화

## Feature Name
seo-optimization

## Status
- Phase: Plan
- Created: 2026-02-19

## Background & Problem

현재 cnctechlab.co.kr 사이트의 SEO 현황:

### 현재 상태 (문제점)
1. **메타데이터 부족**: title/description만 있고 Open Graph, Twitter Card 없음
2. **sitemap.xml 없음**: 검색엔진 크롤링 비효율
3. **robots.txt 없음**: 크롤링 규칙 미정의
4. **구조화 데이터 없음**: Schema.org JSON-LD 미적용 (검색결과 리치 스니펫 불가)
5. **이미지 최적화 안됨**: `output: "export"` + `images: { unoptimized: true }` → Next.js Image 최적화 비활성
6. **불필요한 스크립트**: GitHub Pages SPA redirect 스크립트가 layout.tsx에 남아있음 (Vercel에서 불필요)
7. **favicon 없음**: 브라우저 탭 아이콘 미설정
8. **canonical URL 없음**: 중복 콘텐츠 방지 불가

### 현재 메타데이터 현황
| 페이지 | title | description | OG | JSON-LD |
|--------|-------|-------------|-----|---------|
| Home | (주)씨앤씨테크 - C&C Tech | SEAR TECH 슬로우 로스팅... | X | X |
| Products | 제품 소개 - (주)씨앤씨테크 | SEAR 테크닉 기반... | X | X |
| Training | 교육 컨설팅 - (주)씨앤씨테크 | SCA 공인 교육... | X | X |
| Catering | 케이터링 서비스 - (주)씨앤씨테크 | 커피 케이터링... | X | X |
| B2B | B2B 안내 - (주)씨앤씨테크 | 카페·기업 고객... | X | X |
| Contact | 문의 / 신청 - (주)씨앤씨테크 | 커피 주문 신청... | X | X |

## Goals
1. 검색엔진(Google, Naver) 크롤링 및 인덱싱 최적화
2. SNS 공유 시 OG 미리보기 정상 표시
3. 검색결과에 리치 스니펫(회사정보, 상품) 노출
4. Vercel 환경에 맞게 불필요한 코드 정리
5. Next.js Image 최적화 활성화

## Scope

### In Scope
1. **메타데이터 강화**: 전체 페이지 OG + Twitter Card 메타 태그
2. **sitemap.xml 생성**: 정적 사이트맵
3. **robots.txt 생성**: 크롤링 규칙 정의
4. **구조화 데이터 (JSON-LD)**: Organization, LocalBusiness 스키마
5. **Next.js 설정 변경**: `output: "export"` 제거, Image 최적화 활성화
6. **코드 정리**: GitHub Pages SPA 리다이렉트 스크립트 제거
7. **favicon 추가**: 기존 로고 활용
8. **canonical URL 설정**
9. **네이버 검색 등록**: 네이버 서치어드바이저 메타 태그

### Out of Scope
- Google Analytics / Tag Manager 연동
- 블로그/컨텐츠 마케팅
- 페이지 속도 최적화 (별도 feature)
- 다국어(i18n) 지원

## Implementation Items

### 1. Next.js 설정 변경 (next.config.ts)
- `output: "export"` 제거 (Vercel SSR 활용)
- `images: { unoptimized: true }` 제거 (Image 최적화 활성화)
- `trailingSlash: true` 유지

### 2. layout.tsx 정리 & 글로벌 메타데이터
- GitHub Pages SPA redirect 스크립트 제거
- 글로벌 metadata 강화 (OG, Twitter Card, canonical)
- favicon 연결

### 3. 페이지별 메타데이터 강화 (6개 페이지)
- Open Graph: title, description, image, url, type
- Twitter Card: card, title, description, image

### 4. sitemap.xml (src/app/sitemap.ts)
- 6개 페이지 URL 포함
- lastModified, changeFrequency, priority 설정

### 5. robots.txt (src/app/robots.ts)
- User-agent, Allow/Disallow 규칙
- Sitemap URL 참조

### 6. JSON-LD 구조화 데이터
- Organization: 회사명, 로고, 연락처
- LocalBusiness: 커피 로스팅 사업체 정보

### 7. favicon
- 기존 `C&C Logo_T.png`를 favicon으로 변환/연결

### 8. 네이버 검색 등록
- 네이버 서치어드바이저 소유 확인 메타 태그 (수동 추가 예정)

## Affected Files
- `next.config.ts`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/products/page.tsx`
- `src/app/training/page.tsx`
- `src/app/catering/page.tsx`
- `src/app/b2b/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/sitemap.ts` (신규)
- `src/app/robots.ts` (신규)
- `public/favicon.ico` (신규)

## Priority
**High** - 배포 직후 검색엔진 노출이 비즈니스에 직접적 영향

## Estimated Complexity
**Medium** - 파일 수는 많지만 패턴이 반복적
