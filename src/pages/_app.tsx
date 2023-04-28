import "~/styles/globals.css";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Analytics } from "@vercel/analytics/react";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { TopBar } from "~/components/TopBar";
import { NavBar } from "~/components/NavBar";
import { dark } from "@clerk/themes";
import Head from "next/head";
import { useRouter } from "next/router";

const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]", "/"];

const MyApp: AppType = ({ Component, pageProps }) => {
  const { pathname } = useRouter();

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname);

  return (
    <>
      <Head>
        <title>BattleBard</title>
        <meta name="description" content="BattleBard: TTRPG Tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClerkProvider
        {...pageProps}
        appearance={{
          baseTheme: dark,
        }}
      >
        <div className="over flex max-h-screen min-h-screen bg-orange-600">
          <div className="lg:rounded-layout-reset flex flex-1 flex-col space-y-5 bg-gray-800 sm:mt-1 sm:rounded-t-xl sm:p-6 lg:ml-1 lg:flex-row lg:space-x-5 lg:space-y-0 lg:rounded-tl-xl lg:pb-0 lg:pl-0 lg:pr-0 lg:pt-0">
            <NavBar />
            <div className="scroll mx-3 flex-1 overflow-y-hidden sm:px-0 sm:pt-0 lg:mx-0 lg:p-6">
              <TopBar />
              {isPublicPage ? (
                <Component {...pageProps} />
              ) : (
                <>
                  <SignedIn>
                    <Component {...pageProps} />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              )}
            </div>
          </div>
        </div>
      </ClerkProvider>
      <Analytics />
    </>
  );
};

export default api.withTRPC(MyApp);
