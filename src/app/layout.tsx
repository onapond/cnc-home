import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { MainLayout } from "@/components/features/MainLayout";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-kr",
});

const SITE_URL = "https://cnctechlab.co.kr";
const OG_IMAGE = `${SITE_URL}/images/slide1.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "(주)씨앤씨테크 - 스페셜티 커피 로스팅",
    template: "%s | (주)씨앤씨테크",
  },
  description:
    "SEAR TECH 슬로우 로스팅 기술로 만드는 스페셜티 커피. 커피 교육, 케이터링, B2B 납품 - 씨앤씨테크",
  keywords: [
    "씨앤씨테크",
    "스페셜티커피",
    "커피로스팅",
    "SEAR TECH",
    "바리스타교육",
    "SCA인증",
    "커피케이터링",
    "커피납품",
    "이송마이스터",
  ],
  authors: [{ name: "(주)씨앤씨테크" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "(주)씨앤씨테크",
    title: "(주)씨앤씨테크 - 스페셜티 커피 로스팅",
    description:
      "SEAR TECH 슬로우 로스팅 기술로 만드는 스페셜티 커피. 커피 교육, 케이터링, B2B 납품",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "(주)씨앤씨테크 - SEAR TECH 스페셜티 커피",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "(주)씨앤씨테크 - 스페셜티 커피 로스팅",
    description:
      "SEAR TECH 슬로우 로스팅 기술로 만드는 스페셜티 커피",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/C&C Logo_T.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
