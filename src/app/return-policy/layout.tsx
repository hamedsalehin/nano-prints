import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nano Signs | Return & Refund Policy – Custom Signs & Printing",
  description: "Read the Nano Signs Return and Refund Policy. Learn about our terms, restocking fees for hardware, and instructions for reporting printed product issues.",
  alternates: {
    canonical: "https://nano-signs.com/return-policy",
  },
  openGraph: {
    title: "Nano Signs | Return & Refund Policy – Custom Signs & Printing",
    description: "Read the Nano Signs Return and Refund Policy. Learn about our terms, restocking fees for hardware, and instructions for reporting printed product issues.",
    url: "https://nano-signs.com/return-policy",
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
    title: "Nano Signs | Return & Refund Policy – Custom Signs & Printing",
    description: "Read the Nano Signs Return and Refund Policy. Learn about our terms, restocking fees for hardware, and instructions for reporting printed product issues.",
    images: ["https://nano-signs.com/images/nano%20logo%20complete.png"],
  },
};

export default function ReturnPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
