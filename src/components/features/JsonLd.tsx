export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "(주)씨앤씨테크",
    alternateName: "C&C Tech Co., Ltd.",
    url: "https://cnctechlab.co.kr",
    logo: "https://cnctechlab.co.kr/images/C&C Logo_T.png",
    image: "https://cnctechlab.co.kr/images/slide1.png",
    description:
      "SEAR TECH 슬로우 로스팅 기술 기반 스페셜티 커피 로스팅 전문 기업. 커피 교육, 케이터링, B2B 납품.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
    },
    sameAs: [],
    priceRange: "$$",
    servesCuisine: "Coffee",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "스페셜티 커피 제품",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "에스프레소 블렌드",
            category: "Coffee",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SCA 공인 바리스타 교육",
            category: "Education",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "커피 케이터링",
            category: "Catering",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
