# Plan: contact-page

> (주)씨앤씨테크 문의/신청 페이지 마이그레이션 (Formspree → bkend.ai BaaS)

## 1. Feature Overview

### 1.1 Summary
기존 정적 사이트의 문의 페이지(contact.html, Subscription Form.html)를 Next.js + bkend.ai BaaS로 마이그레이션합니다. Formspree 의존을 제거하고, bkend.ai 데이터 테이블을 활용하여 문의 내역을 관리할 수 있는 동적 폼 시스템을 구축합니다.

### 1.2 Background
- **현재 구현**: Formspree.io 외부 서비스를 통한 이메일 전송
  - 주문 신청 폼 (`formspree.io/f/mblgvker`)
  - 케이터링 신청 폼 (`formspree.io/f/mjvnlrkd`)
  - 일반 문의 폼 (Subscription Form.html)
- **문제점**: 문의 내역 관리 불가, 외부 서비스 의존, 월 제한 존재
- **목표**: bkend.ai BaaS로 문의 데이터를 직접 저장/관리

### 1.3 Goal
- 기존 2종 폼(주문 신청, 케이터링 신청)을 탭 UI로 통합 마이그레이션
- bkend.ai 데이터 API로 문의 내역 저장
- 회사 연락처 정보 표시
- 폼 유효성 검증 및 제출 피드백 (성공/실패)

## 2. Requirements

### 2.1 Functional Requirements

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| FR-01 | 페이지 히어로 배너 | Must | PageHero 컴포넌트 재사용, 배경 이미지 + 타이틀 |
| FR-02 | 탭 기반 폼 전환 | Must | "주문 신청" / "케이터링 신청" 탭으로 폼 전환 |
| FR-03 | 주문 신청 폼 | Must | 이름, 이메일, 메시지 필드 (기존과 동일) |
| FR-04 | 케이터링 신청 폼 | Must | 이름, 이메일, 날짜, 메시지 필드 (기존과 동일) |
| FR-05 | 폼 유효성 검증 | Must | 필수 필드 검증, 이메일 형식 확인 |
| FR-06 | bkend.ai 데이터 저장 | Must | 제출된 문의를 bkend.ai 데이터 테이블에 저장 |
| FR-07 | 제출 피드백 | Must | 성공/실패 알림, 로딩 상태 표시 |
| FR-08 | 연락처 정보 | Should | 이메일, 전화번호, 주소, 운영시간 표시 |
| FR-09 | 반응형 디자인 | Must | 768px 이하 모바일 레이아웃 대응 |

### 2.2 Non-Functional Requirements

| ID | Requirement | Description |
|----|-------------|-------------|
| NFR-01 | 접근성 | aria-label, 레이블 연결, 키보드 탐색 |
| NFR-02 | 보안 | XSS 방지 (입력 값 이스케이프), bkend.ai API 인증 |
| NFR-03 | 성능 | 폼 제출 시 debounce, 중복 제출 방지 |
| NFR-04 | SEO | 메타데이터 (title, description) |

## 3. Scope

### 3.1 In Scope
- `/contact` 페이지 구현
- 탭 전환 UI (주문 신청 / 케이터링 신청)
- bkend.ai `inquiries` 테이블에 데이터 저장
- 폼 유효성 검증 (클라이언트 사이드)
- 연락처 정보 섹션
- 반응형 레이아웃
- PageHero 컴포넌트 재사용

### 3.2 Out of Scope
- 관리자 문의 목록/관리 페이지 (추후 admin feature)
- 이메일 알림 발송 (bkend.ai webhook 또는 추후 기능)
- 파일 첨부 기능
- CAPTCHA / 스팸 방지 (추후 고려)

## 4. Technical Approach

### 4.1 Component Structure

```
src/
├── app/
│   └── contact/
│       └── page.tsx              # Contact 페이지 (Server Component)
├── components/
│   └── features/
│       ├── PageHero.tsx          # 기존 재사용
│       ├── ContactTabs.tsx       # 탭 UI + 폼 컨테이너 (Client)
│       ├── OrderForm.tsx         # 주문 신청 폼 (Client)
│       ├── CateringForm.tsx      # 케이터링 신청 폼 (Client)
│       └── ContactInfo.tsx       # 연락처 정보 (Server)
├── lib/
│   ├── bkend.ts                  # 기존 BaaS 클라이언트 재사용
│   └── contact-data.ts           # 연락처 정보 상수
└── types/
    └── index.ts                  # InquiryForm 타입 추가
```

### 4.2 Key Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| 폼 상태 관리 | React useState | 간단한 폼이므로 react-hook-form 불필요 |
| 데이터 저장 | bkend.ai data API | Formspree 제거, 자체 데이터 관리 가능 |
| 폼 전환 UI | 탭 방식 | 기존 사이트 패턴 유지 (토글 버튼) |
| 컴포넌트 타입 | Client Component (폼) | 사용자 입력/상태 관리 필요 |
| 유효성 검증 | HTML5 + 커스텀 검증 | 브라우저 기본 + 추가 UX |

### 4.3 bkend.ai 데이터 모델

**테이블: `inquiries`**

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| id | uuid | auto | PK |
| type | string | yes | "order" 또는 "catering" |
| name | string | yes | 신청자 이름 |
| email | string | yes | 신청자 이메일 |
| date | string | no | 케이터링 희망 날짜 (케이터링만) |
| message | string | no | 상세 내용 |
| created_at | timestamp | auto | 생성 시간 |

### 4.4 기존 Contact 정보

| 항목 | 값 |
|------|-----|
| 이메일 | 4everlll@naver.com |
| 전화번호 | 02-371-3771 |
| 주소 | 경기도 고양시 덕양구 오금동 686 (삼막5길5) 삼송한강듀클래스지식산업센터 402호 |
| 운영시간 | 평일 오전 8시 ~ 오후 5시 |

## 5. Implementation Order

| Step | Task | Est. Files |
|------|------|-----------|
| 1 | TypeScript 타입 추가 (InquiryForm) | types/index.ts |
| 2 | 연락처 데이터 상수 | lib/contact-data.ts |
| 3 | ContactInfo 컴포넌트 (Server) | ContactInfo.tsx |
| 4 | OrderForm 컴포넌트 (Client) | OrderForm.tsx |
| 5 | CateringForm 컴포넌트 (Client) | CateringForm.tsx |
| 6 | ContactTabs 컴포넌트 (Client) | ContactTabs.tsx |
| 7 | Contact 페이지 조합 | app/contact/page.tsx |
| 8 | bkend.ai inquiries 테이블 연동 테스트 | bkend.ts 활용 |
| 9 | 반응형 스타일 검증 | 전체 |

## 6. Risk & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| bkend.ai API 미설정 | 폼 제출 실패 | 환경변수 확인, 에러 핸들링 추가 |
| 스팸 폼 제출 | 데이터 오염 | 중복 제출 방지 (버튼 비활성화), 추후 CAPTCHA |
| 폼 유효성 미통과 | UX 저하 | 실시간 필드 검증 + 명확한 에러 메시지 |
| 기존 Formspree 엔드포인트 | 마이그레이션 중 서비스 중단 | 완전 전환 후 Formspree 제거 |

## 7. Success Criteria

- [ ] 두 가지 폼(주문/케이터링)이 탭으로 전환 가능
- [ ] 필수 필드 미입력 시 유효성 에러 표시
- [ ] 폼 제출 시 bkend.ai 데이터 테이블에 저장 성공
- [ ] 제출 성공/실패 시 사용자에게 피드백 표시
- [ ] 연락처 정보가 정확히 표시됨
- [ ] 모바일 (768px 이하)에서 레이아웃 정상 작동
- [ ] `npm run build` 에러 없음

---

*Created: 2026-02-11*
*Feature: contact-page*
*Phase: Plan*
