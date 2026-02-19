"use client";

import { useEffect, useState } from "react";
import { bkend } from "@/lib/bkend";
import { Button } from "@/components/ui/Button";
import type { Inquiry, InquiryStatus } from "@/types";

const TYPE_LABELS = { order: "주문", catering: "케이터링", training: "교육" };
const STATUS_OPTIONS: { value: InquiryStatus; label: string }[] = [
  { value: "new", label: "신규" },
  { value: "in_progress", label: "진행중" },
  { value: "completed", label: "완료" },
];

interface InquiryDetailProps {
  inquiryId: string;
  onBack: () => void;
}

export function InquiryDetail({ inquiryId, onBack }: InquiryDetailProps) {
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<InquiryStatus>("new");
  const [adminNote, setAdminNote] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await bkend.data.get("inquiries", inquiryId);
        setInquiry(res);
        setStatus(res.status || "new");
        setAdminNote(res.adminNote || "");
      } catch {
        // Not found
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [inquiryId]);

  async function handleSave() {
    setSaving(true);
    try {
      await bkend.data.update("inquiries", inquiryId, { status, adminNote });
      setInquiry((prev) => (prev ? { ...prev, status, adminNote } : prev));
    } catch {
      alert("저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-gray-500">로딩 중...</p>;
  }

  if (!inquiry) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">문의를 찾을 수 없습니다.</p>
        <Button variant="outline" onClick={onBack}>
          목록으로
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-[800px]">
      <button
        onClick={onBack}
        className="text-medium-roast hover:text-dark-roast mb-6 flex items-center gap-2 text-sm bg-transparent border-none cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        목록으로 돌아가기
      </button>

      <div className="bg-white rounded-2xl shadow-[var(--shadow-md)] p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-dark-roast">문의 상세</h1>
          <span className="bg-cream text-medium-roast px-3 py-1 rounded-lg text-sm font-medium">
            {TYPE_LABELS[inquiry.type]}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-sm text-gray-500 mb-1">이름</p>
            <p className="font-medium text-dark-roast">{inquiry.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">이메일</p>
            <p className="font-medium text-dark-roast">{inquiry.email}</p>
          </div>
          {inquiry.phone && (
            <div>
              <p className="text-sm text-gray-500 mb-1">연락처</p>
              <p className="font-medium text-dark-roast">{inquiry.phone}</p>
            </div>
          )}
          {inquiry.date && (
            <div>
              <p className="text-sm text-gray-500 mb-1">행사 날짜</p>
              <p className="font-medium text-dark-roast">{inquiry.date}</p>
            </div>
          )}
          {inquiry.classInterest && (
            <div>
              <p className="text-sm text-gray-500 mb-1">희망 교육</p>
              <p className="font-medium text-dark-roast">{inquiry.classInterest}</p>
            </div>
          )}
          {inquiry.datePreference && (
            <div>
              <p className="text-sm text-gray-500 mb-1">희망 일정</p>
              <p className="font-medium text-dark-roast">{inquiry.datePreference}</p>
            </div>
          )}
          <div>
            <p className="text-sm text-gray-500 mb-1">접수일</p>
            <p className="font-medium text-dark-roast">
              {new Date(inquiry.createdAt).toLocaleString("ko-KR")}
            </p>
          </div>
        </div>

        {inquiry.message && (
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-2">요청 내용</p>
            <div className="bg-warm-bg rounded-lg p-4 text-dark-roast whitespace-pre-wrap">
              {inquiry.message}
            </div>
          </div>
        )}

        <hr className="my-6 border-gray-100" />

        {/* Admin Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-dark-roast mb-2">
              상태 변경
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as InquiryStatus)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-light-roast"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark-roast mb-2">
              관리자 메모
            </label>
            <textarea
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              rows={4}
              placeholder="내부 메모를 작성하세요..."
              className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-light-roast resize-y"
            />
          </div>

          <Button onClick={handleSave} disabled={saving}>
            {saving ? "저장 중..." : "변경사항 저장"}
          </Button>
        </div>
      </div>
    </div>
  );
}
