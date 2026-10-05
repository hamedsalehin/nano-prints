import React from "react";
import { Metadata } from "next";
import ThankYouClient from "./ThankYouClient";

export const metadata: Metadata = {
  title: "Thank You | Quote Request Received | Nano Signs",
  description: "Thank you for contacting Nano Signs in Fort Lauderdale, FL. Your quote request has been received.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return <ThankYouClient />;
}
