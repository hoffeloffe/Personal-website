import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "@/styles/theme.css";
import "@/styles/typography.css";
import "@/styles/animations.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
