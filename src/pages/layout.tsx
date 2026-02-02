import Navigation from "@/components/Navigation";
import localFont from "next/font/local";
import Head from "next/head";
import { useRouter } from "next/router";
import { type ReactNode } from "react";

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
        <meta property="og:url" content="https://hanjan-ilji.vercel.app/" />
        <meta property="og:title" content="한잔일지" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/preview.png" />
        <meta
          property="og:description"
          content="적당히 즐기는 음주 습관 기록장"
        />
        <meta charSet="UTF-8" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${pretendard.variable} font-pretendard relative min-h-screen bg-[rgb(246,246,246)]`}
      >
        <main
          className={`bg-background mx-auto my-0 h-full min-h-screen max-w-107.5 ${shouldHideNav ? "" : "pb-15"}`}
        >
          {children}
        </main>
        {!shouldHideNav && <Navigation />}
      </div>
    </>
  );
}
