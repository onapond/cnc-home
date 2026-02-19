"use client";

import { useState } from "react";
import { InquiryForm } from "@/components/features/InquiryForm";
import type { InquiryType } from "@/types";

const TABS: { key: InquiryType; label: string }[] = [
  { key: "order", label: "주문 신청" },
  { key: "catering", label: "케이터링 신청" },
];

export function ContactTabs() {
  const [activeTab, setActiveTab] = useState<InquiryType>("order");

  return (
    <div>
      <div className="flex justify-center gap-3 mb-8" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-2.5 text-base rounded-lg cursor-pointer transition-all duration-200 font-medium border-none ${
              activeTab === tab.key
                ? "bg-dark-roast text-white shadow-[var(--shadow-sm)]"
                : "bg-cream text-dark-roast hover:bg-light-roast/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        <InquiryForm key={activeTab} type={activeTab} />
      </div>
    </div>
  );
}
