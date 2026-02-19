"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface PageHeroProps {
  backgroundImage: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ backgroundImage, title, subtitle }: PageHeroProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative w-full h-[350px] flex items-center justify-center overflow-hidden">
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover scale-105"
        priority
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-roast/70 via-dark-roast/40 to-dark-roast/20" />

      <div
        className={`relative z-10 text-center text-white transition-all duration-700 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-bold m-0 drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg mt-3 text-cream/90 drop-shadow-md">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
