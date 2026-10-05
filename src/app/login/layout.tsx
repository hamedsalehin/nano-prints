import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Login | Nano Signs",
  description: "Log in to your Nano Signs account to manage your sign orders and saved designs.",
  alternates: {
    canonical: "https://nano-signs.com/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
