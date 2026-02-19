import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { MainLayout } from "@/components/features/MainLayout";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "(주)씨앤씨테크 - C&C Tech",
  description:
    "SEAR TECH 슬로우 로스팅 기술로 만드는 스페셜티 커피 - 씨앤씨테크",
};

// GitHub Pages SPA redirect handler script
const spaRedirectScript = `
(function(l) {
  if (l.search[1] === '/') {
    var decoded = l.search.slice(1).split('&').map(function(s) {
      return s.replace(/~and~/g, '&')
    }).join('?');
    window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
  }
}(window.location))
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script id="spa-redirect" strategy="beforeInteractive">
          {spaRedirectScript}
        </Script>
      </head>
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
