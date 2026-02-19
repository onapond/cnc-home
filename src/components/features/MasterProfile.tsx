"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const CAREER_ITEMS = [
  "前 WBC KOREA 코디네이터 및 대회 의장",
  "WBC 아시아 최초 심사위원",
  "前 SCAE KOREA 코디네이터",
  "現 SCAE 커피 인증 시험 감독관",
  "現 Coffeeology 아시아 지역 인증관",
] as const;

export function MasterProfile() {
  return (
    <AnimatedSection>
      <section className="py-12 mb-8 bg-cream/50 rounded-2xl px-8">
        <div className="flex items-center gap-3 justify-center mb-10">
          <div className="w-12 h-[2px] bg-light-roast" />
          <h2 className="text-center text-3xl font-bold text-dark-roast">
            로스트 마이스터 소개
          </h2>
          <div className="w-12 h-[2px] bg-light-roast" />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 justify-center">
          <div className="relative">
            <Image
              src="/images/ceo.jpg"
              alt="대표자 이송"
              width={400}
              height={500}
              className="w-[200px] md:w-[300px] h-auto rounded-2xl shadow-[var(--shadow-lg)] object-cover"
            />
          </div>
          <div className="flex-1 min-w-[280px] max-w-[500px]">
            <blockquote className="text-lg text-gray-600 mb-6 leading-relaxed border-l-4 border-light-roast pl-5 italic">
              이송 마이스터는 30년 이상의 커피 교육 경험과 25년 이상의 로스팅
              경험을 가진 대한민국 커피 산업의 선구자입니다.
            </blockquote>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              그는 국제 커피 대회 심사 및 인증, 커피 교육 활동 등 다양한 커피 문화
              발전에 기여해 왔으며, SPC, 웅진식품, 이랜드 등 기업 활동에도 활발히
              참여했습니다.
            </p>
            <ul className="text-base text-gray-600 space-y-2">
              {CAREER_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-light-roast mt-1 shrink-0">&#9679;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
