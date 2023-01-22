import { type AppType } from "next/app";
import Head from "next/head";
import { Provider as ReduxProvider } from "react-redux";
import { default as InnerProviders } from "../lib/core/providers/providers";
import "../lib/core/styles/globals.css";
import { trpc } from "../lib/core/utils/trpc";
import DefaultLayout from "../lib/layouts/DefaultLayout";
import { store } from "../lib/store/store";
import NextNProgress from "nextjs-progressbar";
import { theme } from "@chakra-ui/react";

const MyApp: AppType = ({ Component, pageProps }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const Layout = Component.layout || DefaultLayout;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const title: string = Component.title || "Upwork";

  return (
    <ReduxProvider store={store}>
      <InnerProviders>
        <Head>
          <title>{title}</title>
        </Head>
        <Layout>
          <NextNProgress color={theme.colors.green[500]} />
          <Component {...pageProps} />
        </Layout>
      </InnerProviders>
    </ReduxProvider>
  );
};

export default trpc.withTRPC(MyApp);

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

// TODO: move to other files
BigInt.prototype.toJSON = function (): string {
  return this.toString();
};
