import "../styles/globals.css";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { wsLink, createWSClient } from "@trpc/client/links/wsLink";
import { withTRPC } from "@trpc/next";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { AppType } from "next/dist/shared/lib/utils";
import { ReactElement, ReactNode } from "react";
import superjson from "superjson";
import { DefaultLayout } from "../components/DefaultLayout";
import { AppRouter } from "../server/routers/_app";
import { SessionProvider } from "next-auth/react";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <SessionProvider>{getLayout(<Component {...pageProps} />)}</SessionProvider>
  );
}) as AppType;

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

function getEndingLink() {
  if (typeof window === "undefined") {
    return httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    });
  }

  const client = createWSClient({
    url: process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001",
  });

  return wsLink<AppRouter>({
    client,
  });
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    return {
      links: [loggerLink(), getEndingLink()],
      transformer: superjson,
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            "x-ssr": "1",
          };
        }
        return {};
      },
    };
  },
  ssr: true,
})(MyApp);
