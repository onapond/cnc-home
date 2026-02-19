import { Metadata } from "next";
import { PageHero } from "@/components/features/PageHero";
import { ProductTabs } from "@/components/features/ProductTabs";

export const metadata: Metadata = {
  title: "제품 소개",
  description:
    "SEAR TECH 기반 스페셜티 커피 - 에스프레소 블렌드, 싱글오리진, 커피백, 쿠키. 씨앤씨테크 로스팅 제품 라인업",
  openGraph: {
    title: "제품 소개 | (주)씨앤씨테크",
    description: "SEAR TECH 기반 스페셜티 커피 제품 라인업",
    images: [{ url: "/images/productsimg.png", width: 1200, height: 630 }],
    url: "/products/",
  },
  twitter: {
    card: "summary_large_image",
    title: "제품 소개 | (주)씨앤씨테크",
    description: "SEAR TECH 기반 스페셜티 커피 제품 라인업",
    images: ["/images/productsimg.png"],
  },
  alternates: { canonical: "/products/" },
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
