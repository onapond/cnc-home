import Image from "next/image";
import { CateringMenuItem } from "@/types";

interface MenuItemProps {
  item: CateringMenuItem;
}

export function MenuItem({ item }: MenuItemProps) {
  return (
    <div className="text-center">
      <Image
        src={item.image}
        alt={item.alt}
        width={300}
        height={200}
        className="w-full rounded-lg mb-2.5"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
      <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
      <p className="text-sm text-[#555]">{item.description}</p>
    </div>
  );
}
