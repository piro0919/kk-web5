// eslint-disable-next-line filenames/match-exported
import { KumaRegistry } from "@kuma-ui/next-plugin/registry";
import "@szhsin/react-menu/dist/core.css";
import "@szhsin/react-menu/dist/theme-dark.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { Analytics } from "@vercel/analytics/react";
import "github-markdown-css";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "ress";
import "./globals.scss";
import "./mq-settings.scss";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Hotjar from "@/components/Hotjar";
import Layout from "@/components/Layout";
import LogRocket from "@/components/LogRocket";
import getMetadata from "@/libs/getMetadata";

const jkg = localFont({
  fallback: ["sans-serif"],
  src: [{ path: "./jkg.ttf" }, { path: "./jkg.woff" }, { path: "./jkg.woff2" }],
});

export const metadata = getMetadata({ type: "website" });

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="ja">
      <body className={jkg.className}>
        <KumaRegistry>
          <Layout>{children}</Layout>
        </KumaRegistry>
        <Analytics />
        <GoogleAnalytics />
        <Hotjar />
        <LogRocket />
        <ToastContainer
          autoClose={5000}
          closeOnClick={true}
          hideProgressBar={false}
          pauseOnHover={false}
          position="bottom-left"
          theme="dark"
        />
        <NextTopLoader
          color="#234794"
          height={2}
          shadow={false}
          showSpinner={false}
        />
      </body>
    </html>
  );
}
