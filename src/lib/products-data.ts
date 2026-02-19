import { ProductCategory } from "@/types";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "espresso",
    label: "에스프레소 커피",
    products: [
      {
        id: "apollo",
        name: "아폴로",
        image: "/images/apollo.png",
        hoverImage: "/images/apollo_label.png",
        alt: "아폴로",
        details: [
          { label: "블렌딩", value: "과테말라, 콜롬비아 외" },
          { label: "로스팅", value: "중강배전 (Full City)" },
          { label: "향", value: "풍부한 초콜렛과 카라멜 향" },
          { label: "미", value: "굿 밸런스" },
          { label: "바디", value: "중 바디" },
          { label: "중량", value: "500g, 1kg" },
        ],
        recommendation:
          "후미가 깨끗하고 우아한 커피입니다. 우리의 베스트 셀러입니다.",
      },
      {
        id: "phoenix",
        name: "피닉스",
        image: "/images/phoenix.png",
        hoverImage: "/images/phoenix_label.png",
        alt: "피닉스",
        details: [
          { label: "블렌딩", value: "콜롬비아, 에티오피아 외" },
          { label: "로스팅", value: "중강배전 (Full City)" },
          { label: "향", value: "구운 아몬드의 고소함" },
          { label: "미", value: "굿 밸런스" },
          { label: "바디", value: "중강 바디" },
          { label: "중량", value: "500g, 1kg" },
        ],
        recommendation:
          "은은한 신맛과 다양성이 좋은 커피입니다. 우유/아이스크림과의 하모니가 엑셀렌트합니다.",
      },
      {
        id: "venus",
        name: "베누스",
        image: "/images/venus.png",
        hoverImage: "/images/venus_label.png",
        alt: "베누스",
        details: [
          { label: "블렌딩", value: "에티오피아 100%" },
          { label: "로스팅", value: "중배전 (City)" },
          { label: "향", value: "발효된 과일향" },
          { label: "미", value: "묵직한 산미의 밸런스" },
          { label: "바디", value: "중 바디" },
          { label: "중량", value: "500g, 1kg" },
        ],
        recommendation:
          "에티오피아의 특유의 과일향과 꽃향이 어우러진 커피입니다. 짙은 향의 라떼를 즐길 수 있습니다.",
      },
      {
        id: "ares",
        name: "아레스",
        image: "/images/ares.png",
        hoverImage: "/images/ares_label.png",
        alt: "아레스",
        details: [
          { label: "블렌딩", value: "브라질, 에티오피아 외" },
          { label: "로스팅", value: "중강배전 (Full City)" },
          { label: "향", value: "비스켓, 토스트" },
          { label: "미", value: "브라운 슈가, 다양성" },
          { label: "바디", value: "중 바디" },
          { label: "중량", value: "500g, 1kg" },
        ],
        recommendation:
          "대중적이면서도 풍부한 풍미를 지닌 커피입니다. 모두가 즐길 수 있는 커피입니다.",
      },
      {
        id: "custom",
        name: "커스텀",
        image: "/images/costom.png",
        hoverImage: "/images/costom_label.png",
        alt: "커스텀 원두",
        details: [
          { label: "블렌딩", value: "당신이 원하는 블랜딩" },
          { label: "로스팅", value: "당신이 원하는 배전도" },
          { label: "향", value: "당신이 원하는 향" },
          { label: "미", value: "당신이 원하는 맛" },
          { label: "바디", value: "당신이 원하는 바디" },
          { label: "중량", value: "500g, 1kg" },
        ],
        recommendation:
          "고객이 원하는대로 블랜딩하여 나만의 커피를 만들 수 있습니다. 고객 맞춤형 커피입니다.",
      },
    ],
  },
  {
    id: "single-origin",
    label: "싱글오리진 커피",
    products: [
      {
        id: "ethiopia",
        name: "에티오피아 코케허니 G1",
        image: "/images/ethio.png",
        hoverImage: "/images/ethio_label.png",
        alt: "에티오피아 코케허니",
        details: [
          { label: "향", value: "발효된 살구, 복숭아향, 장미향" },
          { label: "미", value: "은은한 발효된 산미, 굿 밸런스" },
          { label: "바디", value: "중" },
          { label: "중량", value: "200g, 500g" },
        ],
        recommendation: "드립 커피, 콜드브루",
      },
      {
        id: "kenya",
        name: "케냐 AA",
        image: "/images/kenya.png",
        hoverImage: "/images/kenya_label.png",
        alt: "케냐",
        details: [
          { label: "향", value: "다크 초콜릿, 카라멜" },
          { label: "미", value: "굿 밸런스" },
          { label: "바디", value: "강 바디" },
          { label: "중량", value: "200g, 500g" },
        ],
        recommendation: "드립 커피, 콜드브루",
      },
      {
        id: "guatemala",
        name: "과테말라 SHB",
        image: "/images/guate.png",
        hoverImage: "/images/guate_label.png",
        alt: "과테말라",
        details: [
          { label: "향", value: "토스트, 스모키, 넛티" },
          { label: "미", value: "굿 밸런스" },
          { label: "바디", value: "중 바디" },
          { label: "중량", value: "200g, 500g" },
        ],
        recommendation: "드립 커피, 콜드브루",
      },
      {
        id: "brazil",
        name: "브라질 옐로우 버번",
        image: "/images/brazil.png",
        hoverImage: "/images/brazil_label.png",
        alt: "브라질",
        details: [
          { label: "향", value: "브라운 슈가, 헤이즐넛" },
          { label: "미", value: "굿 밸런스" },
          { label: "바디", value: "중 바디" },
          { label: "중량", value: "200g, 500g" },
        ],
        recommendation: "드립 커피, 콜드브루",
      },
    ],
  },
  {
    id: "coffee-bag",
    label: "스페셜티 커피백",
    intro: "즉석에서 간단하게 우려도 바리스타가 만든 것 같은 커피를 맛볼 수 있습니다.\n뜨거운 물에 1분 이상만 우리면 커피 향을 충만하게 즐길 수 있습니다.",
    products: [
      {
        id: "ethio-bag",
        name: "에티오피아 커피백",
        image: "/images/ethio_bag.jpg",
        hoverImage: "/images/coffeebag_DES.png",
        alt: "에티오피아 커피백",
        details: [
          { label: "향", value: "자스민의 꽃향과 살구의 과일향" },
          { label: "미", value: "강한 신맛, 굿 밸런스" },
          { label: "바디", value: "중 바디" },
          {
            label: "커피백 특징",
            value: "커피백은 향,미 보존을 위해 질소 포장이 되어있습니다.",
          },
        ],
        buyLink:
          "https://smartstore.naver.com/isongglobal/products/8148970698",
      },
      {
        id: "kenya-bag",
        name: "케냐 커피백",
        image: "/images/kenya_bag.jpg",
        hoverImage: "/images/coffeebag_DES.png",
        alt: "케냐 커피백",
        details: [
          { label: "향", value: "좋은 당밀과 카라멜 향" },
          { label: "미", value: "블랙 커런트의 신맛, 굿 밸런스" },
          { label: "바디", value: "중 바디" },
          {
            label: "커피백 특징",
            value: "커피백은 향,미 보존을 위해 질소 포장이 되어있습니다.",
          },
        ],
        buyLink:
          "https://smartstore.naver.com/isongglobal/products/8148970698",
      },
      {
        id: "guate-bag",
        name: "과테말라 커피백",
        image: "/images/guate_bag.jpg",
        hoverImage: "/images/coffeebag_DES.png",
        alt: "과테말라 커피백",
        details: [
          { label: "향", value: "아몬드와 호두의 넛티한 향" },
          { label: "미", value: "굿 밸런스" },
          { label: "바디", value: "중 바디" },
          {
            label: "커피백 특징",
            value: "커피백은 향,미 보존을 위해 질소 포장이 되어있습니다.",
          },
        ],
        buyLink:
          "https://smartstore.naver.com/isongglobal/products/8148970698",
      },
      {
        id: "coffee-bag-set",
        name: "커피백 세트",
        image: "/images/coffeebagset.jpg",
        hoverImage: "/images/coffeebag_DES.png",
        alt: "커피백 세트",
        details: [
          {
            label: "설명",
            value:
              "이송글로벌의 좋은 커피백을 좋은 가격에 즐길 수 있는 커피백 세트",
          },
        ],
        buyLink:
          "https://smartstore.naver.com/isongglobal/products/9144928295",
      },
    ],
  },
];
