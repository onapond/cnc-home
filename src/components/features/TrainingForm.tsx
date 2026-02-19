"use client";

import { FormEvent, useState } from "react";

const CLASS_OPTIONS = [
  { value: "", label: "선택하세요" },
  { value: "SCA 교육", label: "SCA 바리스타, 브루잉, 로스팅 교육" },
  { value: "Coffieology 교육", label: "Coffieology 교육" },
  { value: "Konditorei 클래스", label: "Konditorei (독일 베이커리) 클래스" },
  { value: "One Day 클래스", label: "One Day 클래스 (커피, 베이커리)" },
  { value: "매장 바리스타 교육", label: "매장 바리스타 교육" },
  { value: "카페 메뉴 & 운영 컨설팅", label: "카페 메뉴 & 운영 컨설팅" },
  { value: "기타", label: "기타" },
];

const inputClass =
  "w-full p-3 mb-5 border border-[#ddd] rounded-md text-base";

export function TrainingForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("https://formspree.io/f/mblgvker", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });

      if (res.ok) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="max-w-[800px] mx-auto mt-20 mb-10 px-5">
      <div className="bg-white rounded-lg shadow-sm p-10 px-5 sm:px-10">
        <h2 className="text-center text-[#222] mb-8">교육 문의 신청</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="training_name" className="block mb-2 font-bold text-[#444]">
            이름
          </label>
          <input
            type="text"
            id="training_name"
            name="name"
            required
            className={inputClass}
          />

          <label htmlFor="training_email" className="block mb-2 font-bold text-[#444]">
            이메일
          </label>
          <input
            type="email"
            id="training_email"
            name="email"
            required
            className={inputClass}
          />

          <label htmlFor="training_phone" className="block mb-2 font-bold text-[#444]">
            연락처
          </label>
          <input
            type="text"
            id="training_phone"
            name="phone"
            placeholder="예: 010-1234-5678"
            className={inputClass}
          />

          <label htmlFor="training_class" className="block mb-2 font-bold text-[#444]">
            희망 교육 과정
          </label>
          <select
            id="training_class"
            name="class_interest"
            required
            className={inputClass}
          >
            {CLASS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label htmlFor="training_date_pref" className="block mb-2 font-bold text-[#444]">
            희망 교육 날짜/요일 (선택 사항)
          </label>
          <input
            type="text"
            id="training_date_pref"
            name="date_preference"
            placeholder="예: 주말, 평일 저녁, 7월 중"
            className={inputClass}
          />

          <label htmlFor="training_message" className="block mb-2 font-bold text-[#444]">
            문의 내용
          </label>
          <textarea
            id="training_message"
            name="message"
            rows={7}
            placeholder="궁금한 점이나 특별히 요청할 사항을 자세히 적어주세요."
            className={`${inputClass} min-h-[100px] resize-y`}
          />

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full p-4 bg-blue-500 text-white border-none rounded-md text-lg font-bold cursor-pointer hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "전송 중..." : "교육 상담 신청하기"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-center text-green-600 font-semibold">
            교육 상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-center text-red-600 font-semibold">
            전송 중 오류가 발생했습니다. 다시 시도해 주세요.
          </p>
        )}
      </div>
    </section>
  );
}
