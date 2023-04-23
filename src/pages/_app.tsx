import { type AppType } from "next/app";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { TopBar } from "~/components/TopBar";
import { NavBar } from "~/components/NavBar";
import { dark } from "@clerk/themes";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider
      {...pageProps}
      appearance={{
        baseTheme: dark,
      }}
    >
      <div className="flex min-h-screen bg-orange-600">
        <div className="lg:rounded-layout-reset flex flex-1 flex-col space-y-5 bg-gray-800 sm:mt-1 sm:rounded-t-xl sm:p-6 lg:ml-1 lg:flex-row lg:space-x-5 lg:space-y-0 lg:rounded-tl-xl lg:pb-0 lg:pl-0 lg:pt-0">
          <NavBar />
          <div className="mx-3 flex-1 sm:px-0 sm:pt-0 lg:mx-0 lg:p-6">
            <TopBar />
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
