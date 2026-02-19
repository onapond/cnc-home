"use client";

import { useEffect, useState } from "react";
import { bkend } from "@/lib/bkend";
import { InquiryTable } from "@/components/features/InquiryTable";
import { InquiryDetail } from "@/components/features/InquiryDetail";
import type { Inquiry, InquiryType, InquiryStatus } from "@/types";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<InquiryType | "all">("all");
  const [filterStatus, setFilterStatus] = useState<InquiryStatus | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const params: Record<string, string> = { sort: "-createdAt" };
        if (filterType !== "all") params["filter[type]"] = filterType;
        if (filterStatus !== "all") params["filter[status]"] = filterStatus;
        const res = await bkend.data.list("inquiries", params);
        setInquiries(res.data || []);
      } catch {
        // API not set up yet
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filterType, filterStatus]);

  // Detail view
  if (selectedId) {
    return (
      <InquiryDetail
        inquiryId={selectedId}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  const selectClass =
    "px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-light-roast";

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark-roast mb-6">문의 관리</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as InquiryType | "all")}
          className={selectClass}
        >
          <option value="all">전체 유형</option>
          <option value="order">주문</option>
          <option value="catering">케이터링</option>
          <option value="training">교육</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as InquiryStatus | "all")}
          className={selectClass}
        >
          <option value="all">전체 상태</option>
          <option value="new">신규</option>
          <option value="in_progress">진행중</option>
          <option value="completed">완료</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">로딩 중...</p>
      ) : (
        <InquiryTable inquiries={inquiries} onSelect={setSelectedId} />
      )}
    </div>
  );
}
