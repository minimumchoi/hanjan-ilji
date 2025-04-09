import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "@/pages/layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noNavPages = ["/", "/login", "/signup"];
  const isNavHidden = noNavPages.includes(router.pathname);

  const content = isNavHidden ? (
    <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );

  return content;
}
