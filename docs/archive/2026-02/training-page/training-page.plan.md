# Plan: training-page

> (주)씨앤씨테크 교육 컨설팅 페이지 마이그레이션

## 1. Feature Overview

### 1.1 Summary
기존 정적 HTML 사이트의 교육 컨설팅 페이지(`traning.html`)를 Next.js App Router + Tailwind CSS로 마이그레이션합니다. 6개 교육 프로그램 카드 그리드와 교육 문의 신청 폼을 포함합니다.

### 1.2 Background
- 기존 페이지: 인라인 CSS + 6개 교육 프로그램 카드 + Formspree 기반 문의 폼
- 교육 프로그램 데이터가 HTML에 하드코딩
- 문의 폼은 Formspree(`https://formspree.io/f/mblgvker`)로 전송
- 목표: 컴포넌트 기반으로 재구성, PageHero 재사용, 향후 bkend.ai 연동 대비

### 1.3 Goal
- 기존 교육 컨설팅 페이지의 모든 콘텐츠를 1:1 마이그레이션
- 페이지 히어로 배너 (PageHero 컴포넌트 재사용)
- 6개 교육 프로그램 카드 그리드 (호버 효과 포함)
- 교육 문의 신청 폼 (Formspree 연동 유지)

## 2. Requirements

### 2.1 Functional Requirements

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| FR-01 | 페이지 히어로 배너 | Must | 배경 이미지(`training-banner.png`) + "교육 컨설팅" 타이틀 |
| FR-02 | 섹션 타이틀 | Must | "(주)씨앤씨테크 교육 프로그램" |
| FR-03 | 교육 프로그램 카드 (6개) | Must | SCA, Coffieology, Konditorei, One Day, 매장 바리스타, 카페 컨설팅 |
| FR-04 | 카드 호버 효과 | Should | 마우스오버 시 translateY(-5px) 상승 효과 |
| FR-05 | 교육 문의 신청 폼 | Must | 이름, 이메일, 연락처, 희망 교육 과정, 희망 날짜, 문의 내용 |
| FR-06 | 폼 제출 (Formspree) | Must | `https://formspree.io/f/mblgvker`로 POST 전송 |
| FR-07 | 반응형 그리드 | Must | 데스크톱 3열 → 모바일 1열 |

### 2.2 Non-Functional Requirements

| ID | Requirement | Description |
|----|-------------|-------------|
| NFR-01 | 이미지 최적화 | next/image 사용, 카드 이미지 고정 높이 200px |
| NFR-02 | 접근성 | 폼 label + id 연결, 필수 필드 표시 |
| NFR-03 | SEO | 시맨틱 HTML, 페이지별 메타데이터 |

## 3. Scope

### 3.1 In Scope
- `/training` 라우트 페이지 생성
- PageHero 컴포넌트 재사용 (products-page에서 생성 완료)
- 교육 프로그램 카드 컴포넌트
- 교육 문의 신청 폼 컴포넌트 (Client Component)
- 교육 이미지 에셋 복사 (7개 파일)
- Formspree 폼 연동

### 3.2 Out of Scope
- bkend.ai 연동 (교육 일정 동적 관리)
- 교육 예약/결제 기능
- 관리자 대시보드 (교육 문의 관리)
- 교육 후기/리뷰

## 4. Technical Approach

### 4.1 Component Structure

```
src/
├── app/
│   └── training/
│       └── page.tsx                # Training page
├── components/
│   └── features/
│       ├── PageHero.tsx            # 재사용 (이미 생성됨)
│       ├── TrainingCard.tsx        # 교육 프로그램 카드
│       └── TrainingForm.tsx        # 교육 문의 폼 (Client Component)
└── lib/
    └── training-data.ts           # 교육 프로그램 데이터
```

### 4.2 Key Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| PageHero | 재사용 | products-page에서 이미 생성, props만 변경 |
| TrainingCard | Server Component | 호버 효과는 CSS-only, 인터랙션 없음 |
| TrainingForm | Client Component | 폼 제출 처리, 상태 관리 필요 |
| 폼 전송 | Formspree (기존 유지) | BaaS 연동 전까지 기존 서비스 활용 |
| 교육 데이터 | TypeScript 상수 배열 | 추후 bkend.ai 연동 시 데이터 소스만 교체 |

### 4.3 Data Structures

```typescript
interface TrainingProgram {
  id: string;
  title: string;
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
| 연락처 | text | phone | No |
| 희망 교육 과정 | select | class_interest | Yes |
| 희망 날짜/요일 | text | date_preference | No |
| 문의 내용 | textarea | message | No |

**교육 과정 선택지 (7개)**:
1. SCA 바리스타, 브루잉, 로스팅 교육
2. Coffieology 교육
3. Konditorei (독일 베이커리) 클래스
4. One Day 클래스 (커피, 베이커리)
5. 매장 바리스타 교육
6. 카페 메뉴 & 운영 컨설팅
7. 기타

### 4.5 Image Migration
기존 사이트에서 교육 관련 이미지 복사 (7개):
- 배너: `training-banner.png`
- 카드: `sca-barista.png`, `coffieology.png`, `konditorei.png`, `one-day-class.png`, `store-barista.png`, `cafe-consulting.png`

## 5. Implementation Order

| Step | Task | Est. Files |
|------|------|-----------|
| 1 | 교육 이미지 에셋 복사 (7개) | public/images/* |
| 2 | TrainingProgram 타입 정의 | types/index.ts |
| 3 | 교육 프로그램 데이터 상수 정의 | lib/training-data.ts |
| 4 | TrainingCard 컴포넌트 | TrainingCard.tsx |
| 5 | TrainingForm 컴포넌트 | TrainingForm.tsx |
| 6 | Training 페이지 조합 | training/page.tsx |
| 7 | 빌드 검증 | npm run build |

## 6. Risk & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Formspree 스팸 | 불필요한 이메일 수신 | Formspree 내장 스팸 필터 활용 |
| 폼 제출 후 피드백 없음 | UX 저하 | 제출 성공/실패 상태 메시지 표시 |
| 이미지 크기 불일치 | 카드 레이아웃 깨짐 | object-cover + 고정 높이 200px |

## 7. Success Criteria

- [ ] 히어로 배너에 training-banner.png 배경 + "교육 컨설팅" 타이틀
- [ ] 6개 교육 프로그램 카드가 표시됨
- [ ] 카드 호버 시 상승 효과 동작
- [ ] 반응형 그리드 (3열 → 1열)
- [ ] 교육 문의 폼 6개 필드 표시
- [ ] 폼 제출이 Formspree로 정상 전송됨
- [ ] 폼 제출 후 성공/실패 메시지 표시
- [ ] 모든 이미지 next/image 최적화
- [ ] `npm run build` 성공

---

*Created: 2026-02-10*
*Feature: training-page*
*Phase: Plan*
