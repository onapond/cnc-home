"use client";

import { FormEvent, useState } from "react";

const inputClass =
  "w-full p-3 mb-5 border border-[#ddd] rounded-md text-base";

export function CateringForm() {
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
    <section
      id="catering-form"
      className="max-w-[800px] mx-auto mt-20 mb-10 px-5 scroll-mt-28"
    >
      <div className="bg-white rounded-lg shadow-sm p-10 px-5 sm:px-10">
        <h2 className="text-center text-[#222] mb-2">케이터링 서비스 신청</h2>
        <p className="text-center text-[#666] mb-8 leading-relaxed">
          최대 250분까지의 케이터링 서비스가 가능하며
          <br />
          모든 식음료는 고객의 요청에 따라 맞춤 변경이 가능합니다.
        </p>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="catering_name"
            className="block mb-2 font-bold text-[#444]"
          >
            이름 *
          </label>
          <input
            type="text"
            id="catering_name"
            name="name"
            required
            className={inputClass}
          />

          <label
            htmlFor="catering_email"
            className="block mb-2 font-bold text-[#444]"
          >
            이메일 *
          </label>
          <input
            type="email"
            id="catering_email"
            name="email"
            required
            className={inputClass}
          />

          <label
            htmlFor="catering_date"
            className="block mb-2 font-bold text-[#444]"
          >
            행사 날짜
          </label>
          <input
            type="date"
            id="catering_date"
            name="date"
            className={inputClass}
          />

          <label
            htmlFor="catering_message"
            className="block mb-2 font-bold text-[#444]"
          >
            요청 사항
          </label>
          <textarea
            id="catering_message"
            name="message"
            rows={5}
            placeholder="예: 30명 규모 / 핸드드립 2시간 운영 / 1인당 1잔"
            className={`${inputClass} min-h-[100px] resize-y`}
          />

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full p-4 bg-[#333] text-white border-none rounded-md text-lg font-bold cursor-pointer hover:bg-[#555] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "전송 중..." : "케이터링 신청"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-center text-green-600 font-semibold">
            케이터링 서비스 신청이 완료되었습니다. 빠른 시일 내에
            연락드리겠습니다.
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
