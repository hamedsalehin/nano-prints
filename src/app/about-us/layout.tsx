import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Custom Print Shop Oakland Park FL | Nano Signs",
  description: "Learn about Nano Signs, your local Oakland Park & Fort Lauderdale printing workshop for high-quality custom signs, banners, and marketing products.",
  alternates: {
    canonical: "https://nano-signs.com/about-us",
  },
  openGraph: {
    title: "About Us | Custom Print Shop Oakland Park FL | Nano Signs",
    description: "Learn about Nano Signs, your local Oakland Park & Fort Lauderdale printing workshop for high-quality custom signs, banners, and marketing products.",
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
