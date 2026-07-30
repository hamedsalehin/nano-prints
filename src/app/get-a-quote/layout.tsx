import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nano Signs | Get a Free Sign & Print Quote Fort Lauderdale FL",
  description: "Request a fast, free quote for custom business signs, vinyl banners & neon signs in Fort Lauderdale FL. Same-day response! Call 305-967-1005 or apply online.",
  alternates: {
    canonical: "https://nano-signs.com/get-a-quote",
  },
  openGraph: {
    title: "Nano Signs | Get a Free Sign & Print Quote Fort Lauderdale FL",
    description: "Request a fast, free quote for custom business signs, vinyl banners & neon signs in Fort Lauderdale FL. Same-day response! Call 305-967-1005 or apply online.",
    url: "https://nano-signs.com/get-a-quote",
    type: "website",
    siteName: "Nano Signs",
    images: [
      {
        url: "https://nano-signs.com/images/nano%20logo%20complete.png",
        width: 1200,
        height: 630,
        alt: "Nano Signs - Custom Printing & Signage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nano Signs | Get a Free Sign & Print Quote Fort Lauderdale FL",
    description: "Request a fast, free quote for custom business signs, vinyl banners & neon signs in Fort Lauderdale FL. Same-day response! Call 305-967-1005 or apply online.",
    images: ["https://nano-signs.com/images/nano%20logo%20complete.png"],
  },
};

export default function GetAQuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
