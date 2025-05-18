import Navigation from "@/components/Navigation";
import type { ReactNode } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const hideNavRoutes = ["/", "/login", "/signup"];
  const shouldHideNav = hideNavRoutes.includes(router.pathname);

  return (
    <>
      <Head>
        <title>한잔일지</title>
        <meta name="description" content="적당히 즐기는 음주 습관 기록장" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${pretendard.variable} font-pretendard relative min-h-screen`}
      >
        <main
          className={`max-w-[430px] ${shouldHideNav ? "" : "pb-[3.75rem]"}`}
        >
          {children}
        </main>
        {!shouldHideNav && <Navigation />}
      </div>
    </>
  );
}
