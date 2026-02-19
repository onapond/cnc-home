import { HeroSlider } from "@/components/features/HeroSlider";
import { AboutSection } from "@/components/features/AboutSection";
import { MasterProfile } from "@/components/features/MasterProfile";
import { CoffeeExpertise } from "@/components/features/CoffeeExpertise";
import { OrganizationJsonLd } from "@/components/features/JsonLd";

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <HeroSlider />
      <main className="max-w-[1000px] mx-auto py-16 px-5 space-y-4">
        <AboutSection />
        <MasterProfile />
        <CoffeeExpertise />
      </main>
    </>
  );
}
