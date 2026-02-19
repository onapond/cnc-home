"use client";

import { useState } from "react";
import { bkend } from "@/lib/bkend";

export function ContactCateringForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await bkend.data.create("inquiries", {
        type: "catering",
        name: formData.name,
        email: formData.email,
        date: formData.date,
        message: formData.message,
      });
      setStatus("success");
      setFormData({ name: "", email: "", date: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-[600px] mx-auto mb-12 p-8 bg-[#fdfdfd] shadow-lg rounded-xl">
      <h2 className="text-center text-xl font-bold mb-5 text-[#333]">
        케이터링 신청
      </h2>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="catering-name"
          className="block mt-4 font-bold text-[#333]"
        >
          이름
        </label>
        <input
          type="text"
          id="catering-name"
          name="name"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full p-2.5 mt-1 rounded-md border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#333] focus:border-transparent"
        />

        <label
          htmlFor="catering-email"
          className="block mt-4 font-bold text-[#333]"
        >
          이메일
        </label>
        <input
          type="email"
          id="catering-email"
          name="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="w-full p-2.5 mt-1 rounded-md border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#333] focus:border-transparent"
        />

        <label
          htmlFor="catering-date"
          className="block mt-4 font-bold text-[#333]"
        >
          행사 날짜
        </label>
        <input
          type="date"
          id="catering-date"
          name="date"
          required
          value={formData.date}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, date: e.target.value }))
          }
          className="w-full p-2.5 mt-1 rounded-md border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#333] focus:border-transparent"
        />

        <label
          htmlFor="catering-message"
          className="block mt-4 font-bold text-[#333]"
        >
          요청 사항
        </label>
        <textarea
          id="catering-message"
          name="message"
          rows={5}
          placeholder="예: 30명 규모 / 핸드드립 2시간 운영 / 1인당 1잔"
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          className="w-full p-2.5 mt-1 rounded-md border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#333] focus:border-transparent"
        />

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-5 w-full py-3 bg-[#333] text-white border-none rounded-md cursor-pointer hover:bg-[#555] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "전송 중..." : "케이터링 신청"}
        </button>
      </form>

      {status === "success" && (
        <p className="mt-4 text-center text-green-600">
          케이터링 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-center text-red-600">
          전송에 실패했습니다. 다시 시도해주세요.
        </p>
      )}
    </div>
  );
}
