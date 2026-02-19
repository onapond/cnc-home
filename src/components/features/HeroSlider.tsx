"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  {
    image: "/images/slide1.png",
    alt: "스페셜 블렌드 런칭",
    title: "good coffee makes a good day",
    subtitle: "스페셜 블렌드 런칭",
    cta: { label: "자세히 보기", href: "/products" },
  },
  {
    image: "/images/slide2.png",
    alt: "싱글 오리진 신제품",
    title: "good coffee makes a good day",
    subtitle: "싱글 오리진 신제품",
    cta: { label: "구경하기", href: "/products" },
  },
  {
    image: "/images/slide3.png",
    alt: "정기배송 혜택",
    title: "good coffee makes a good day",
    subtitle: "정기배송 혜택",
    cta: { label: "신청하기", href: "/contact" },
  },
] as const;

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative w-full h-[65vh] min-h-[400px]">
      <div ref={emblaRef} className="overflow-hidden h-full">
        <div className="flex h-full">
          {SLIDES.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-roast/60 via-transparent to-dark-roast/20" />

              <div className="absolute bottom-[15%] left-[8%] md:left-[10%] text-white z-10">
                <p className="text-sm md:text-base uppercase tracking-[3px] text-cream/80 mb-2">
                  {slide.subtitle}
                </p>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
                  {slide.title}
                </h2>
                <Link
                  href={slide.cta.href}
                  className="inline-block bg-medium-roast text-white px-7 py-3 rounded-lg font-semibold hover:bg-light-roast transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  {slide.cta.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev/Next Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-white/30"
        aria-label="이전 슬라이드"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-white/30"
        aria-label="다음 슬라이드"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dot Pagination */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "w-8 h-3 bg-cream"
                : "w-3 h-3 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`슬라이드 ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
