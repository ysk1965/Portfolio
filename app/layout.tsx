import type { Metadata } from "next";
import { Archivo, Noto_Sans_KR } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | 기술로 비즈니스 임팩트를 만드는 개발자",
  description:
    "7년차 게임 개발자 & PO. KRAFTON, COOKAPPS에서의 경험과 사이드 프로젝트를 소개합니다.",
  openGraph: {
    title: "Portfolio | 기술로 비즈니스 임팩트를 만드는 개발자",
    description:
      "7년차 게임 개발자 & PO. KRAFTON, COOKAPPS에서의 경험과 사이드 프로젝트를 소개합니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${archivo.variable} ${notoSansKR.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground"
        >
          본문으로 건너뛰기
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
