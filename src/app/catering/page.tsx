import { Metadata } from "next";
import { PageHero } from "@/components/features/PageHero";
import { CATERING_MENU } from "@/lib/catering-data";
import { MenuItem } from "@/components/features/MenuItem";
import { InquiryForm } from "@/components/features/InquiryForm";

export const metadata: Metadata = {
  title: "케이터링 서비스 - (주)씨앤씨테크",
  description: "커피 케이터링, 디저트 케이터링 서비스 - 씨앤씨테크",
};

export default function CateringPage() {
  return (
    <>
      <PageHero
        backgroundImage="/images/catering-banner.png"
        title="케이터링 서비스"
      />
      <main className="max-w-[1000px] mx-auto py-10 px-5">
        <h2 className="text-center text-2xl font-bold text-dark-roast mb-8">
          메뉴 소개
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {CATERING_MENU.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </main>

      <section className="text-center mt-12">
        <a
          href="#catering-form"
          className="inline-block bg-dark-roast text-white px-8 py-3 rounded-lg font-semibold no-underline hover:bg-medium-roast transition-all duration-300 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]"
        >
          케이터링 문의하기
        </a>
      </section>

      <InquiryForm
        type="catering"
        description="최대 250분까지의 케이터링 서비스가 가능하며 모든 식음료는 고객의 요청에 따라 맞춤 변경이 가능합니다."
      />
    </>
  );
}
