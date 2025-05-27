import type { AppProps } from "next/app";
import Layout from "@/pages/layout";
import "@/styles/globals.css";
import { UserProvider } from "@/contexts/userContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </Layout>
  );
}
