import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nano Signs | Local Sign & Print Company Fort Lauderdale FL",
  description: "Learn about Nano Signs at 4567 Powerline Rd, Fort Lauderdale FL. Local experts in custom storefront signs, banner printing & neon LED displays.",
  alternates: {
    canonical: "https://nano-signs.com/about-us",
  },
  openGraph: {
    title: "Nano Signs | Local Sign & Print Company Fort Lauderdale FL",
    description: "Learn about Nano Signs at 4567 Powerline Rd, Fort Lauderdale FL. Local experts in custom storefront signs, banner printing & neon LED displays.",
    url: "https://nano-signs.com/about-us",
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
    title: "Nano Signs | Local Sign & Print Company Fort Lauderdale FL",
    description: "Learn about Nano Signs at 4567 Powerline Rd, Fort Lauderdale FL. Local experts in custom storefront signs, banner printing & neon LED displays.",
    images: ["https://nano-signs.com/images/nano%20logo%20complete.png"],
  },
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
