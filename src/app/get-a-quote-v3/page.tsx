import { Metadata } from "next";
import QuoteV3Client from "./QuoteV3Client";

export const revalidate = 86400; // Cache pre-rendered HTML for maximum instant load speed

export const metadata: Metadata = {
  title: "Fast 4-Hour Custom Sign Quote | Nano Signs Fort Lauderdale FL",
  description: "Request a free custom sign quote in under 30 seconds. Get precision pricing & digital proof within 4 hours in Fort Lauderdale & Oakland Park FL.",
  alternates: {
    canonical: "https://nano-signs.com/get-a-quote-v3",
  },
};

export default function GetQuoteV3Page() {
  return <QuoteV3Client />;
}
