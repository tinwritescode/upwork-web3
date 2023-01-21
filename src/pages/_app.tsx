import { type AppType } from "next/app";
import Head from "next/head";
import { Provider as ReduxProvider } from "react-redux";
import { default as InnerProviders } from "../lib/core/providers/providers";
import "../lib/core/styles/globals.css";
import { trpc } from "../lib/core/utils/trpc";
import DefaultLayout from "../lib/layouts/DefaultLayout";
import { store } from "../lib/store/store";

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
          <Component {...pageProps} />
        </Layout>
      </InnerProviders>
    </ReduxProvider>
  );
};

export default trpc.withTRPC(MyApp);
