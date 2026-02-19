"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function CoffeeExpertise() {
  return (
    <AnimatedSection>
      <section className="py-12">
        <div className="flex items-center gap-3 justify-center mb-8">
          <div className="w-12 h-[2px] bg-light-roast" />
          <h2 className="text-center text-3xl font-bold text-dark-roast">
            (주)씨앤씨테크의 커피 전문성
          </h2>
          <div className="w-12 h-[2px] bg-light-roast" />
        </div>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          저희 커피는 단순히 맛있는 것을 넘어, 건강하고 지속 가능한 가치를 담고
          있습니다. (주)씨앤씨테크 커피를 만들 때 고수하는 두 가지 원칙은 다음과
          같습니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-warm-bg rounded-xl p-6 border-l-4 border-medium-roast">
            <h3 className="text-xl font-bold text-dark-roast mb-3">
              건강한 커피 만들기
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              슬로우 로스팅 기법을 통해 로스팅 과정에서 발생되는 유해 성분을 줄이고
              쓴맛과 탄맛을 절제하여 깔끔하고 건강한 맛을 만들어냅니다.
            </p>
          </div>
          <div className="bg-warm-bg rounded-xl p-6 border-l-4 border-medium-roast">
            <h3 className="text-xl font-bold text-dark-roast mb-3">
              일관된 품질 유지
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              생두 선별에서 납품까지의 전생산 과정에서 QC를 행하며 각 배치별 센서리
              테스트를 거쳐 항상 같은 품질의 커피를 고객에게 제공하려 노력합니다.
            </p>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
