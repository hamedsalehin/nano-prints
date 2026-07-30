import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nano Signs | Contact Us – Fort Lauderdale Sign Shop | 305-967-1005",
  description:
    "Reach 2026 Nano Signs at 4567 Powerline Rd, Fort Lauderdale FL 33309. Call 305-967-1005 for custom signs, banner printing, LED & neon signs. Mon–Fri 9am–6pm.",
  alternates: {
    canonical: "https://nano-signs.com/contact-us",
  },
  openGraph: {
    title: "Nano Signs | Contact Us – Fort Lauderdale Sign Shop | 305-967-1005",
    description:
      "Reach 2026 Nano Signs at 4567 Powerline Rd, Fort Lauderdale FL 33309. Call 305-967-1005 for custom signs, banner printing, LED & neon signs. Mon–Fri 9am–6pm.",
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
    title: "Nano Signs | Contact Us – Fort Lauderdale Sign Shop | 305-967-1005",
    description:
      "Reach 2026 Nano Signs at 4567 Powerline Rd, Fort Lauderdale FL 33309. Call 305-967-1005 for custom signs, banner printing, LED & neon signs. Mon–Fri 9am–6pm.",
    images: ["https://nano-signs.com/images/nano%20logo%20complete.png"],
  },
};

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
