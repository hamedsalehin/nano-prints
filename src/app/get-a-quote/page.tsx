import { Metadata } from "next";
import QuotePageClient from "./QuotePageClient";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Nano Signs | Free Custom Sign Quote (4-Hour Turnaround)",
  description: "Request a free custom sign quote in Fort Lauderdale & Oakland Park FL. Get line-item pricing, digital proof & 4-hour guaranteed response. Call 305-967-1005.",
  alternates: {
    canonical: "https://nano-signs.com/get-a-quote",
  },
};

export default function GetQuotePage() {
  return <QuotePageClient />;
}
