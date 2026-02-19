import { Metadata } from "next";
import { PageHero } from "@/components/features/PageHero";
import { TRAINING_PROGRAMS } from "@/lib/training-data";
import { TrainingCard } from "@/components/features/TrainingCard";
import { InquiryForm } from "@/components/features/InquiryForm";

export const metadata: Metadata = {
  title: "교육 컨설팅",
  description:
    "SCA 공인 바리스타 교육, 원데이 클래스, 카페 창업 컨설팅. 30년 경력 이송 마이스터의 커피 교육 프로그램",
  openGraph: {
    title: "교육 컨설팅 | (주)씨앤씨테크",
    description: "SCA 공인 바리스타 교육, 원데이 클래스, 카페 창업 컨설팅",
    images: [{ url: "/images/training-banner.png", width: 1200, height: 630 }],
    url: "/training/",
  },
  twitter: {
    card: "summary_large_image",
    title: "교육 컨설팅 | (주)씨앤씨테크",
    description: "SCA 공인 바리스타 교육, 원데이 클래스, 카페 창업 컨설팅",
    images: ["/images/training-banner.png"],
  },
  alternates: { canonical: "/training/" },
};

export default function TrainingPage() {
  return (
    <>
      <PageHero
        backgroundImage="/images/training-banner.png"
        title="교육 컨설팅"
      />
      <main className="max-w-[1000px] mx-auto py-10 px-5">
        <h2 className="text-center text-2xl font-bold text-dark-roast mb-8">
          (주)씨앤씨테크 교육 프로그램
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAINING_PROGRAMS.map((program) => (
            <TrainingCard key={program.id} program={program} />
          ))}
        </div>
      </main>

      <InquiryForm type="training" />
    </>
  );
}
