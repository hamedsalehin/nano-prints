import { Metadata } from "next";
import QuotePageClient from "./QuotePageClient";

export const metadata: Metadata = {
  title: "Get a Free Sign Quote Oakland Park FL | Nano Signs",
  description: "Request a free quote for custom business signs, banner printing, LED displays & neon signs in Oakland Park FL. Fast 12-hour response. Call 305-967-1005.",
  alternates: {
    canonical: "https://nano-signs.com/get-a-quote",
  },
};

export default function GetQuotePage() {
  return <QuotePageClient />;
}
