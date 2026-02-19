import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-[var(--shadow-sm)] overflow-hidden p-5 text-left transition-all duration-300 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1">
      {/* Image with hover effect */}
      <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden bg-warm-bg">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          className={`object-contain transition-all duration-500 group-hover:scale-105 ${
            product.hoverImage ? "group-hover:opacity-0" : ""
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={`${product.alt} 라벨`}
            fill
            className="object-contain opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>

      {/* Product name */}
      <h2 className="text-center text-lg font-bold text-dark-roast my-3">
        {product.name}
      </h2>

      {/* Product details */}
      {product.details.map((detail, index) => (
        <p key={index} className="text-sm text-gray-600 my-1.5">
          <strong className="text-medium-roast">{detail.label} :</strong>{" "}
          {detail.value}
        </p>
      ))}

      {/* Roaster recommendation */}
      {product.recommendation && (
        <p className="text-sm text-gray-600 my-1.5">
          <strong className="text-medium-roast">로스터 추천</strong>
          <br />
          {product.recommendation}
        </p>
      )}

      {/* Buy button */}
      {product.buyLink && (
        <a
          href={product.buyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-medium-roast text-white px-5 py-2.5 rounded-lg mt-3 font-semibold hover:bg-dark-roast transition-all duration-300 shadow-sm hover:shadow-md"
        >
          구매하기
        </a>
      )}
    </div>
  );
}
