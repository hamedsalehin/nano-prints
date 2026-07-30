import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nano Signs | Contact Us – Fort Lauderdale Sign Shop",
  description:
    "Visit Nano Signs at 4567 Powerline Rd, Fort Lauderdale FL 33309 or call 305-967-1005. Mon-Fri 9am-6pm. Get instant quotes on custom signs & banner printing.",
  alternates: {
    canonical: "https://nano-signs.com/contact-us",
  },
  openGraph: {
    title: "Nano Signs | Contact Us – Fort Lauderdale Sign Shop",
    description:
      "Visit Nano Signs at 4567 Powerline Rd, Fort Lauderdale FL 33309 or call 305-967-1005. Mon-Fri 9am-6pm. Get instant quotes on custom signs & banner printing.",
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
    title: "Nano Signs | Contact Us – Fort Lauderdale Sign Shop",
    description:
      "Visit Nano Signs at 4567 Powerline Rd, Fort Lauderdale FL 33309 or call 305-967-1005. Mon-Fri 9am-6pm. Get instant quotes on custom signs & banner printing.",
    images: ["https://nano-signs.com/images/nano%20logo%20complete.png"],
  },
};

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
