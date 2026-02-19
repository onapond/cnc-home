import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "B2B 안내",
  description:
    "카페·기업 고객을 위한 커피 원두 도매 납품, OEM, 협업 및 제휴 안내 - 씨앤씨테크",
  openGraph: {
    title: "B2B 안내 | (주)씨앤씨테크",
    description: "카페·기업 고객을 위한 커피 원두 도매 납품, OEM, 협업 안내",
    images: [{ url: "/images/slide2.png", width: 1200, height: 630 }],
    url: "/b2b/",
  },
  twitter: {
    card: "summary_large_image",
    title: "B2B 안내 | (주)씨앤씨테크",
    description: "카페·기업 고객을 위한 커피 원두 도매 납품, OEM, 협업 안내",
    images: ["/images/slide2.png"],
  },
  alternates: { canonical: "/b2b/" },
};

export default function B2BPage() {
  return (
    <main className="max-w-[900px] mx-auto my-12 p-10 px-5 sm:px-10 bg-white rounded-xl shadow-sm">
      <h1 className="text-center mb-8">카페 · 기업 고객을 위한 B2B 안내</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-[#222]">
          도매 납품 안내
        </h2>
        <p className="text-[#444] leading-relaxed mb-4">
          (주)씨앤씨테크는 전국 카페 및 식음료 매장, 기업 고객에게 자사 제품 및
          고객 맞춤형 원두 납품을 진행하고 있습니다. 다양한 블렌딩과 로스팅
          프로파일로 고객의 매장 특성에 맞는 커피를 제공합니다.
        </p>
        <ul className="list-disc pl-5 leading-loose text-[#444]">
          <li>소량부터 대량까지 유연한 납품 시스템</li>
          <li>매장 맞춤형 블렌딩 및 테이스팅 컨설팅</li>
          <li>정기 납품 및 재고 관리 지원</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-[#222]">
          협업 브랜드 사례
        </h2>
        <p className="text-[#444] leading-relaxed">
          국내 100여개 매장에 원두를 납품하고 있으며 (주)씨앤씨테크는 컨설팅과
          트레이닝을 지원하여 파트너와의 지속적인 성장을 추구합니다.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-[#222]">
          상담 및 제휴 문의
        </h2>
        <p className="text-[#444] leading-relaxed mb-4">
          아래 버튼을 눌러{" "}
          <Link
            href="/contact"
            className="text-blue-600 underline hover:text-blue-800"
          >
            문의 페이지
          </Link>
          를 통해 연락 주시면 빠르게 답변드리겠습니다. 전화 및 이메일을 통한
          상담도 가능합니다.
        </p>
        <p className="text-[#444] leading-relaxed">
          <strong className="font-bold">이메일:</strong> isong8686@daum.net
          <br />
          <strong className="font-bold">전화:</strong> 02-371-3771
        </p>
      </section>
    </main>
  );
}
