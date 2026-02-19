"use client";

import { useState } from "react";
import { PRODUCT_CATEGORIES } from "@/lib/products-data";
import { ProductCard } from "./ProductCard";

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState(PRODUCT_CATEGORIES[0].id);

  const activeCategory = PRODUCT_CATEGORIES.find(
    (cat) => cat.id === activeTab
  );

  return (
    <div>
      {/* Tab buttons */}
      <div className="text-center mt-10" role="tablist">
        {PRODUCT_CATEGORIES.map((category) => (
          <button
            key={category.id}
            role="tab"
            aria-selected={activeTab === category.id}
            onClick={() => setActiveTab(category.id)}
            className={`mx-2 px-4 py-2 border-none rounded cursor-pointer text-base transition-colors ${
              activeTab === category.id
                ? "bg-[#333] text-white"
                : "bg-[#eee] text-[#333] hover:bg-[#ddd]"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeCategory && (
        <div role="tabpanel">
          {/* Category intro text (coffee bags) */}
          {activeCategory.intro && (
            <p className="text-center max-w-[800px] mx-auto mt-8 text-[#333] text-base leading-relaxed">
              {activeCategory.intro.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < activeCategory.intro!.split("\n").length - 1 && <br />}
                </span>
              ))}
            </p>
          )}

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-[1200px] mx-auto px-4">
            {activeCategory.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
