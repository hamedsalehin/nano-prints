import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Custom Print Shop Oakland Park FL | Nano Signs",
  description: "Get in touch with Nano Signs in Oakland Park & Fort Lauderdale FL. Call 305-967-1005 or start a live chat for custom signs, banners, and flag orders.",
  alternates: {
    canonical: "https://nano-signs.com/contact-us",
  },
  openGraph: {
    title: "Contact Us | Custom Print Shop Oakland Park FL | Nano Signs",
    description: "Get in touch with Nano Signs in Oakland Park & Fort Lauderdale FL. Call 305-967-1005 or start a live chat for custom signs, banners, and flag orders.",
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
