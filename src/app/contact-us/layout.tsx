import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Nano Signs | Sign Shop Oakland Park FL | Call 305-967-1005",
  description: "Contact Nano Signs at 4567 Powerline Rd, Oakland Park FL 33309. Call 305-967-1005 for custom business signs, banner printing, LED signs & neon signs.",
  alternates: {
    canonical: "https://nano-signs.com/contact-us",
  },
  openGraph: {
    title: "Contact Nano Signs | Sign Shop Oakland Park FL | Call 305-967-1005",
    description: "Contact Nano Signs at 4567 Powerline Rd, Oakland Park FL 33309. Call 305-967-1005 for custom business signs, banner printing, LED signs & neon signs.",
    url: "https://nano-signs.com/contact-us",
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
    images: ["https://nano-signs.com/images/nano%20logo%20complete.png"],
  },
};

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
