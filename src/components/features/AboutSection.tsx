"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function AboutSection() {
  return (
    <>
      {/* Section 1: SEAR TECH */}
      <AnimatedSection>
        <section className="py-12 mb-8">
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="w-12 h-[2px] bg-light-roast" />
            <h2 className="text-center text-3xl font-bold text-dark-roast">
              첨단 커피 로스팅 - 새로운 기술
            </h2>
            <div className="w-12 h-[2px] bg-light-roast" />
          </div>
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
            <p>
              500년이 넘는 커피 문화의 역사 속에서, 저희는 로스팅 기술을 획기적으로
              개선하는 데 성공했습니다. 이는 커피 문화를 한 단계 더 높은 수준으로
              끌어올리고 맛의 새로운 품질을 제시하는 기술입니다.
            </p>
            <p>
              저희는 이 혁신적인 기술을{" "}
              <span className="font-bold text-medium-roast">
                &lsquo;SEAR TECH (Sensitive Espresso - Aroma Roasting)&#8482;&rsquo;
              </span>
              이라고 부르며, 이는 한국과 아시아에서 독보적인 기술입니다. 저희는 모든
              원두가 동일한 양의 열을 받을 수 있도록 로스팅하며, 과도하거나 덜
              로스팅되는 것을 방지하여 원두 하나하나를 완벽한 정도로 로스팅합니다.
            </p>
            <p>
              저희 커피를 경험하는 고객과 소비자들은 특별한 품질과 풍부한 향에
              매료됩니다. 저희 커피는 현재 한국 전역 100개 이상의 매장에서 만나볼 수
              있습니다.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Section 2: Customer Support */}
      <AnimatedSection delay={100}>
        <section className="py-12 mb-8 bg-warm-bg rounded-2xl px-8">
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="w-12 h-[2px] bg-light-roast" />
            <h2 className="text-center text-3xl font-bold text-dark-roast">
              고객과 커피숍을 지원하는 방법
            </h2>
            <div className="w-12 h-[2px] bg-light-roast" />
          </div>
          <ul className="text-lg text-gray-600 space-y-3 leading-relaxed">
            {[
              "합리적인 가격으로 우수한 커피 품질을 제공합니다.",
              "추출 및 인증 교육(SCAE)을 제공합니다.",
              "음료 메뉴를 제안해 드립니다.",
              "인테리어 계획을 제안해 드립니다.",
              "푸드 컨설팅을 제공합니다.",
              "머신 전문 청소 및 살균 서비스를 제공합니다.",
              "비상 바리스타 지원: 대기 바리스타를 통해 시간 단위로 지원을 제공합니다.",
              "품질 + 서비스 + 환경 보호는 시장에서의 성공을 증대시킬 것입니다.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-light-roast mt-1 shrink-0">&#9679;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </AnimatedSection>

      {/* Section 3: Quality Info */}
      <AnimatedSection delay={200}>
        <section className="py-12 mb-8">
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="w-12 h-[2px] bg-light-roast" />
            <h2 className="text-center text-3xl font-bold text-dark-roast">
              추가 품질 정보 및 더욱 건강한 커피
            </h2>
            <div className="w-12 h-[2px] bg-light-roast" />
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            하루 3~4잔의 커피는 건강에 좋은 것으로 알려져 있으며, 커피에는
            항산화제와 카페인이 함유되어 있습니다. SEAR 슬로우 로스팅 기술은
            과도하게 로스팅되거나 덜 로스팅된 원두가 없도록 하여, 기존 로스팅
            과정에서 일부 원두가 너무 어둡게 되어 발생할 수 있는 불필요한 물질
            생성을 방지합니다. 쓴맛 성분이나 탄 맛은 형성되지 않습니다. 또한, 원두
            선별부터 생두 배송까지 전체 생산 과정에서 품질 관리를 수행하며, 고객에게
            항상 동일하면서도 우수한 품질의 커피를 제공하기 위해 각 로스팅 배치별로
            관능 테스트를 실시합니다.
          </p>
        </section>
      </AnimatedSection>
    </>
  );
}
