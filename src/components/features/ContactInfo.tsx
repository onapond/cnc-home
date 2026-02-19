import { CONTACT_ITEMS } from "@/lib/contact-data";

export function ContactInfo() {
  return (
    <section className="max-w-[600px] mx-auto mt-10 p-8 bg-[#fdfdfd] shadow-lg rounded-xl">
      <h2 className="text-center text-xl font-bold mb-5 text-[#333]">
        연락처 정보
      </h2>
      <div className="space-y-3">
        {CONTACT_ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-start gap-3 text-[15px] leading-relaxed text-[#444]"
          >
            <span className="shrink-0">{item.icon}</span>
            <p>
              <strong>{item.label}:</strong> {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
