import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

// function SafeHydrate({ children }) {
//   return (
//     <div suppressHydrationWarning>
//       {typeof window === "undefined" ? null : children}
//     </div>
//   );
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <SafeHydrate>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </QueryClientProvider>
    // </SafeHydrate>
  );
}

export default MyApp;
