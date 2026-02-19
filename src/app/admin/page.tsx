"use client";

import { useEffect, useState } from "react";
import { bkend } from "@/lib/bkend";
import { StatsCard } from "@/components/features/StatsCard";
import type { Inquiry } from "@/types";

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await bkend.data.list("inquiries", { sort: "-createdAt" });
        setInquiries(res.data || []);
      } catch {
        // API not set up yet - show empty state
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const stats = {
    total: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    inProgress: inquiries.filter((i) => i.status === "in_progress").length,
    completed: inquiries.filter((i) => i.status === "completed").length,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark-roast mb-8">대시보드</h1>

      {loading ? (
        <p className="text-gray-500">로딩 중...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatsCard label="총 문의" value={stats.total} color="#6F4E37" />
            <StatsCard label="신규" value={stats.new} color="#3B82F6" />
            <StatsCard label="진행중" value={stats.inProgress} color="#EAB308" />
            <StatsCard label="완료" value={stats.completed} color="#22C55E" />
          </div>

          <div className="bg-white rounded-xl shadow-[var(--shadow-sm)] p-6">
            <h2 className="text-lg font-bold text-dark-roast mb-4">최근 문의</h2>
            {inquiries.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                아직 문의가 없습니다. bkend.ai에 inquiries 테이블을 생성해주세요.
              </p>
            ) : (
              <ul className="space-y-3">
                {inquiries.slice(0, 5).map((inquiry) => (
                  <li
                    key={inquiry._id}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <div>
                      <span className="font-medium text-dark-roast">
                        {inquiry.name}
                      </span>
                      <span className="text-gray-400 text-sm ml-2">
                        ({inquiry.type})
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(inquiry.createdAt).toLocaleDateString("ko-KR")}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
