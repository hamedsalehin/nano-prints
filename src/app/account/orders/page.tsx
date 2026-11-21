import { Metadata } from "next";
import OrdersPageClient from "./OrdersPageClient";

export const metadata: Metadata = {
  title: "My Orders | Nano Signs",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrdersPage() {
  return <OrdersPageClient />;
}
