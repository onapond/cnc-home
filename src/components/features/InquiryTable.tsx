"use client";

import type { Inquiry, InquiryStatus, InquiryType } from "@/types";

const TYPE_LABELS: Record<InquiryType, string> = {
  order: "주문",
  catering: "케이터링",
  training: "교육",
};

const STATUS_CONFIG: Record<InquiryStatus, { label: string; className: string }> = {
  new: { label: "신규", className: "bg-blue-100 text-blue-700" },
  in_progress: { label: "진행중", className: "bg-yellow-100 text-yellow-700" },
  completed: { label: "완료", className: "bg-green-100 text-green-700" },
};

interface InquiryTableProps {
  inquiries: Inquiry[];
  onSelect: (id: string) => void;
}

export function InquiryTable({ inquiries, onSelect }: InquiryTableProps) {
  if (inquiries.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-[var(--shadow-sm)] p-12 text-center text-gray-400">
        문의가 없습니다.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-[var(--shadow-sm)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-warm-bg text-left">
              <th className="px-4 py-3 font-semibold text-dark-roast">유형</th>
              <th className="px-4 py-3 font-semibold text-dark-roast">이름</th>
              <th className="px-4 py-3 font-semibold text-dark-roast">이메일</th>
              <th className="px-4 py-3 font-semibold text-dark-roast">상태</th>
              <th className="px-4 py-3 font-semibold text-dark-roast">날짜</th>
              <th className="px-4 py-3 font-semibold text-dark-roast"></th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => {
              const statusConfig = STATUS_CONFIG[inquiry.status] || STATUS_CONFIG.new;
              return (
                <tr
                  key={inquiry._id}
                  className="border-t border-gray-100 hover:bg-warm-bg/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="bg-cream text-medium-roast px-2 py-1 rounded text-xs font-medium">
                      {TYPE_LABELS[inquiry.type]}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-dark-roast">
                    {inquiry.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{inquiry.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.className}`}
                    >
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(inquiry.createdAt).toLocaleDateString("ko-KR")}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onSelect(inquiry._id)}
                      className="text-medium-roast hover:text-dark-roast font-medium transition-colors bg-transparent border-none cursor-pointer"
                    >
                      상세
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
