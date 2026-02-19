import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-dark-roast text-cream/80 mt-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold text-cream mb-4">
              (주)씨앤씨테크
            </h3>
            <p className="text-sm leading-relaxed">
              SEAR TECH 슬로우 로스팅 기술로
              <br />
              만드는 스페셜티 커피
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-cream mb-4">바로가기</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-cream transition-colors">
                  제품 소개
                </Link>
              </li>
              <li>
                <Link href="/training" className="hover:text-cream transition-colors">
                  교육 컨설팅
                </Link>
              </li>
              <li>
                <Link href="/catering" className="hover:text-cream transition-colors">
                  케이터링
                </Link>
              </li>
              <li>
                <Link href="/b2b" className="hover:text-cream transition-colors">
                  B2B
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cream transition-colors">
                  문의 / 신청
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-cream mb-4">연락처</h3>
            <ul className="space-y-2 text-sm">
              <li>경기도 남양주시 다산순환로 147</li>
              <li>다산현대프리미어캠퍼스 A동 605호</li>
              <li>Tel: 031-523-3285</li>
              <li>Email: canctech@cnctechlab.co.kr</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/20 mt-10 pt-6 text-center text-xs text-cream/50">
          <p>&copy; 2026 C&amp;C Tech Co., Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
