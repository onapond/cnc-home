"use client";

import { useState } from "react";
import { bkend } from "@/lib/bkend";
import { Button } from "@/components/ui/Button";
import { InputField, TextAreaField, SelectField } from "@/components/ui/Input";
import type { InquiryType, InquiryFormData } from "@/types";

const TRAINING_OPTIONS = [
  { value: "", label: "선택하세요" },
  { value: "SCA 교육", label: "SCA 바리스타, 브루잉, 로스팅 교육" },
  { value: "Coffieology 교육", label: "Coffieology 교육" },
  { value: "Konditorei 클래스", label: "Konditorei (독일 베이커리) 클래스" },
  { value: "One Day 클래스", label: "One Day 클래스 (커피, 베이커리)" },
  { value: "매장 바리스타 교육", label: "매장 바리스타 교육" },
  { value: "카페 메뉴 & 운영 컨설팅", label: "카페 메뉴 & 운영 컨설팅" },
  { value: "기타", label: "기타" },
];

const FORM_CONFIG: Record<
  InquiryType,
  { title: string; submitLabel: string; successMessage: string; placeholder: string }
> = {
  order: {
    title: "주문 신청",
    submitLabel: "신청하기",
    successMessage: "주문 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.",
    placeholder: "예: 아폴로 1kg / 월 2회 배송 희망",
  },
  catering: {
    title: "케이터링 서비스 신청",
    submitLabel: "케이터링 신청",
    successMessage: "케이터링 서비스 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.",
    placeholder: "예: 30명 규모 / 핸드드립 2시간 운영 / 1인당 1잔",
  },
  training: {
    title: "교육 문의 신청",
    submitLabel: "교육 상담 신청하기",
    successMessage: "교육 상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.",
    placeholder: "궁금한 점이나 특별히 요청할 사항을 자세히 적어주세요.",
  },
};

interface InquiryFormProps {
  type: InquiryType;
  description?: string;
}

export function InquiryForm({ type, description }: InquiryFormProps) {
  const config = FORM_CONFIG[type];
  const [formData, setFormData] = useState<InquiryFormData>({
    type,
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
    classInterest: "",
    datePreference: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function updateField(field: keyof InquiryFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    // Build payload, omitting empty optional fields
    const payload: Record<string, string> = {
      type: formData.type,
      name: formData.name,
      email: formData.email,
    };
    if (formData.phone) payload.phone = formData.phone;
    if (formData.date) payload.date = formData.date;
    if (formData.message) payload.message = formData.message;
    if (formData.classInterest) payload.classInterest = formData.classInterest;
    if (formData.datePreference) payload.datePreference = formData.datePreference;

    try {
      await bkend.data.create("inquiries", payload);
      setStatus("success");
      setFormData({
        type,
        name: "",
        email: "",
        phone: "",
        date: "",
        message: "",
        classInterest: "",
        datePreference: "",
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="max-w-[700px] mx-auto my-10 px-5 scroll-mt-28" id={`${type}-form`}>
      <div className="bg-white rounded-2xl shadow-[var(--shadow-md)] p-8 md:p-10">
        <h2 className="text-center text-2xl font-bold text-dark-roast mb-2">
          {config.title}
        </h2>
        {description && (
          <p className="text-center text-gray-500 mb-8 leading-relaxed">
            {description}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <InputField
            label="이름 *"
            id={`${type}-name`}
            type="text"
            required
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
          />

          <InputField
            label="이메일 *"
            id={`${type}-email`}
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
          />

          <InputField
            label="연락처"
            id={`${type}-phone`}
            type="text"
            placeholder="예: 010-1234-5678"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />

          {/* Training-specific fields */}
          {type === "training" && (
            <>
              <SelectField
                label="희망 교육 과정 *"
                id="training-class"
                required
                options={TRAINING_OPTIONS}
                value={formData.classInterest}
                onChange={(e) => updateField("classInterest", e.target.value)}
              />
              <InputField
                label="희망 교육 날짜/요일"
                id="training-date-pref"
                type="text"
                placeholder="예: 주말, 평일 저녁, 7월 중"
                value={formData.datePreference}
                onChange={(e) => updateField("datePreference", e.target.value)}
              />
            </>
          )}

          {/* Catering-specific: event date */}
          {type === "catering" && (
            <InputField
              label="행사 날짜"
              id="catering-date"
              type="date"
              value={formData.date}
              onChange={(e) => updateField("date", e.target.value)}
            />
          )}

          <TextAreaField
            label={type === "training" ? "문의 내용" : "요청 사항"}
            id={`${type}-message`}
            rows={5}
            placeholder={config.placeholder}
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
          />

          <Button
            type="submit"
            disabled={status === "submitting"}
            className="w-full mt-2"
            size="lg"
          >
            {status === "submitting" ? "전송 중..." : config.submitLabel}
          </Button>
        </form>

        {status === "success" && (
          <p className="mt-5 text-center text-green-600 font-semibold bg-green-50 py-3 rounded-lg">
            {config.successMessage}
          </p>
        )}
        {status === "error" && (
          <p className="mt-5 text-center text-red-600 font-semibold bg-red-50 py-3 rounded-lg">
            전송 중 오류가 발생했습니다. 다시 시도해 주세요.
          </p>
        )}
      </div>
    </section>
  );
}
