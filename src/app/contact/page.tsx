import { Metadata } from "next";
import { PageHero } from "@/components/features/PageHero";
import { ContactTabs } from "@/components/features/ContactTabs";
import { ContactInfo } from "@/components/features/ContactInfo";

export const metadata: Metadata = {
  title: "문의 / 신청",
  description:
    "커피 주문, 교육 신청, 케이터링 문의 - (주)씨앤씨테크에 문의해주세요",
  openGraph: {
    title: "문의 / 신청 | (주)씨앤씨테크",
    description: "커피 주문, 교육 신청, 케이터링 문의",
    images: [{ url: "/images/slide3.png", width: 1200, height: 630 }],
    url: "/contact/",
  },
  twitter: {
    card: "summary_large_image",
    title: "문의 / 신청 | (주)씨앤씨테크",
    description: "커피 주문, 교육 신청, 케이터링 문의",
    images: ["/images/slide3.png"],
  },
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero backgroundImage="/images/slide3.png" title="문의 / 신청" />
      <main className="max-w-[1000px] mx-auto my-10 px-5">
        <ContactTabs />
        <ContactInfo />
      </main>
    </>
  );
}
