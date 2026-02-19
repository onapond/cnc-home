import { Metadata } from "next";
import { PageHero } from "@/components/features/PageHero";
import { ContactTabs } from "@/components/features/ContactTabs";
import { ContactInfo } from "@/components/features/ContactInfo";

export const metadata: Metadata = {
  title: "문의 / 신청 - (주)씨앤씨테크",
  description: "커피 주문 신청 및 케이터링 문의 - (주)씨앤씨테크",
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
