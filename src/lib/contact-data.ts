export const CONTACT_INFO = {
  email: "4everlll@naver.com",
  phone: "02-371-3771",
  address:
    "경기도 고양시 덕양구 오금동 686 (삼막5길5) 삼송한강듀클래스지식산업센터 402호",
  hours: "평일 오전 8시 ~ 오후 5시",
} as const;

export const CONTACT_ITEMS = [
  { icon: "📧", label: "이메일", value: CONTACT_INFO.email },
  { icon: "📞", label: "전화", value: CONTACT_INFO.phone },
  { icon: "📍", label: "주소", value: CONTACT_INFO.address },
  { icon: "🕘", label: "운영 시간", value: CONTACT_INFO.hours },
] as const;
