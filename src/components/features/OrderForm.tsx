"use client";

import { useState } from "react";
import { bkend } from "@/lib/bkend";

export function OrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
        type: "order",
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-[600px] mx-auto mb-12 p-8 bg-[#fdfdfd] shadow-lg rounded-xl">
      <h2 className="text-center text-xl font-bold mb-5 text-[#333]">
        주문 신청
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="order-name" className="block mt-4 font-bold text-[#333]">
          이름
        </label>
        <input
          type="text"
          id="order-name"
          name="name"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full p-2.5 mt-1 rounded-md border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#333] focus:border-transparent"
        />

        <label
          htmlFor="order-email"
          className="block mt-4 font-bold text-[#333]"
        >
          이메일
        </label>
        <input
          type="email"
          id="order-email"
          name="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="w-full p-2.5 mt-1 rounded-md border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#333] focus:border-transparent"
        />

        <label
          htmlFor="order-message"
          className="block mt-4 font-bold text-[#333]"
        >
          원하는 주문 내용
        </label>
        <textarea
          id="order-message"
          name="message"
          rows={5}
          placeholder="예: 아폴로 1kg / 월 2회 배송 희망"
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
          {status === "submitting" ? "전송 중..." : "신청하기"}
        </button>
      </form>

      {status === "success" && (
        <p className="mt-4 text-center text-green-600">
          신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.
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
