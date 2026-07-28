import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Nano Signs | Local Sign Shop Oakland Park FL",
  description: "Oakland Park's premier sign shop and print company at 4567 Powerline Rd. Custom business signs, banner printing, LED displays & neon signs in Oakland Park FL.",
  alternates: {
    canonical: "https://nano-signs.com/about-us",
  },
  openGraph: {
    title: "About Nano Signs | Local Sign Shop Oakland Park FL",
    description: "Oakland Park's premier sign shop and print company at 4567 Powerline Rd. Custom business signs, banner printing, LED displays & neon signs in Oakland Park FL.",
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
    images: ["https://nano-signs.com/images/nano%20logo%20complete.png"],
  },
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
