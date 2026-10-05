import { Metadata } from "next";
import QuoteV2Client from "./QuoteV2Client";

export const metadata: Metadata = {
  title: "Fast Mobile Quote Request | Nano Signs Fort Lauderdale FL",
  description: "Get a free 12-hour custom sign quote in Fort Lauderdale & Oakland Park FL. Instant mobile quote wizard for LED signs, banners, acrylic, and vehicle graphics.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GetQuoteV2Page() {
  return <QuoteV2Client />;
}
