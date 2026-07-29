import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Free Sign & print Quote Fort Lauderdale | Nano Signs",
  description: "Request a free quote for custom signs & print, banner printing, LED signs & neon signs in Fort Lauderdale & Oakland Park FL. Fast response. Call 305-967-1005.",
  alternates: {
    canonical: "https://nano-signs.com/get-a-quote",
  },
  openGraph: {
    title: "Get a Free Sign & print Quote Fort Lauderdale | Nano Signs",
    description: "Request a free quote for custom signs & print, banner printing, LED signs & neon signs in Fort Lauderdale & Oakland Park FL. Fast response. Call 305-967-1005.",
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
    title: "Get a Free Sign & print Quote Fort Lauderdale | Nano Signs",
    description: "Request a free quote for custom signs & print, banner printing, LED signs & neon signs in Fort Lauderdale & Oakland Park FL. Fast response. Call 305-967-1005.",
    images: ["https://nano-signs.com/images/nano%20logo%20complete.png"],
  },
};

export default function GetAQuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
