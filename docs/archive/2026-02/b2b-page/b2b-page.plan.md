# Plan: b2b-page

> (주)씨앤씨테크 B2B 안내 페이지 마이그레이션

## 1. Feature Overview

### 1.1 Summary
기존 정적 HTML 사이트의 B2B 페이지(`b2b.html`)를 Next.js App Router + Tailwind CSS로 마이그레이션합니다. 카페/기업 고객 대상 도매 납품, 협업 브랜드 사례, 상담/제휴 문의 정보를 포함하는 텍스트 중심의 정보 페이지입니다.

### 1.2 Background
- 기존 페이지: 인라인 CSS + 3개 섹션 (도매 납품, 협업 브랜드, 상담 문의)
- 이미지 없음, 폼 없음 — 텍스트 기반 정보 페이지
- 상담 문의 섹션에서 contact.html로 링크
- 연락처 정보: isong8686@daum.net / 02-371-3771
- 목표: 컴포넌트 기반 재구성, 일관된 레이아웃 적용

### 1.3 Goal
- 기존 B2B 페이지의 모든 콘텐츠를 1:1 마이그레이션
- 3개 정보 섹션 렌더링 (도매 납품, 협업 브랜드, 상담/제휴 문의)
- 도매 납품 안내 리스트 (3개 항목)
- contact 페이지 링크 연결
- 이메일/전화번호 표시

## 2. Requirements

### 2.1 Functional Requirements

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| FR-01 | 페이지 타이틀 | Must | "카페 · 기업 고객을 위한 B2B 안내" |
| FR-02 | 도매 납품 안내 섹션 | Must | 소개 텍스트 + 3개 리스트 항목 |
| FR-03 | 협업 브랜드 사례 섹션 | Must | 국내 100여개 매장 납품 소개 |
| FR-04 | 상담 및 제휴 문의 섹션 | Must | contact 페이지 링크 + 이메일/전화번호 |
| FR-05 | Contact 페이지 내부 링크 | Must | `/contact` 라우트로 링크 |

### 2.2 Non-Functional Requirements

| ID | Requirement | Description |
|----|-------------|-------------|
| NFR-01 | SEO | 시맨틱 HTML, 페이지별 메타데이터 |
| NFR-02 | 접근성 | 시맨틱 섹션 구조 (section, h2) |
| NFR-03 | 일관된 디자인 | 기존 페이지와 동일한 카드형 레이아웃 |

## 3. Scope

### 3.1 In Scope
- `/b2b` 라우트 페이지 생성
- 3개 정보 섹션 (도매 납품, 협업 브랜드, 상담 문의)
- contact 페이지 내부 링크 (`next/link`)
- 연락처 정보 표시

### 3.2 Out of Scope
- 히어로 배너 (기존 페이지에 없음)
- 폼/인터랙션 (없음 — 순수 정보 페이지)
- bkend.ai 연동 (정적 콘텐츠)
- 협업 브랜드 로고/이미지 (기존 페이지에 없음)

## 4. Technical Approach

### 4.1 Component Structure

```
src/
├── app/
│   └── b2b/
│       └── page.tsx           # B2B 페이지 (Server Component)
└── (no new components needed)
```

### 4.2 Key Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| 컴포넌트 | Server Component only | 인터랙션 없음, 정적 텍스트 |
| 레이아웃 | 단일 카드형 컨테이너 | 기존 디자인 유지 (max-w-[900px], 카드 스타일) |
| 새 컴포넌트 | 불필요 | 단순 구조, 페이지 내 직접 작성 |
| 링크 | next/link | contact 페이지 내부 라우팅 |

### 4.3 Image Migration
- 이미지 없음 (텍스트 전용 페이지)

## 5. Implementation Order

| Step | Task | Est. Files |
|------|------|------------|
| 1 | B2B 페이지 생성 | app/b2b/page.tsx |
| 2 | 빌드 검증 | npm run build |

## 6. Risk & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| contact 페이지 미구현 | 링크 깨짐 | `/contact` 라우트 아직 없으므로 빌드는 통과하되, 런타임에 404 가능. contact-page 구현 시 해결 |
| 콘텐츠 부족 | 빈 느낌의 페이지 | 기존 콘텐츠 그대로 마이그레이션, 향후 보강 가능 |

## 7. Success Criteria

- [ ] 페이지 타이틀 "카페 · 기업 고객을 위한 B2B 안내" 표시
- [ ] "도매 납품 안내" 섹션: 소개 텍스트 + 3개 리스트 항목
- [ ] "협업 브랜드 사례" 섹션: 소개 텍스트
- [ ] "상담 및 제휴 문의" 섹션: contact 링크 + 이메일/전화
- [ ] `/contact` 링크가 next/link 사용
- [ ] 카드형 컨테이너 (max-w-[900px], 흰 배경, 라운드, 그림자)
- [ ] 페이지 메타데이터 설정 (title, description)
- [ ] `npm run build` 성공

---

*Created: 2026-02-10*
*Feature: b2b-page*
*Phase: Plan*
