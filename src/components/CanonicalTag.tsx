"use client";

import { usePathname } from "next/navigation";

export function CanonicalTag() {
  const pathname = usePathname();
  
  if (!pathname) return null;

  return (
    <link rel="canonical" href={`https://nano-signs.com${pathname}`} />
  );
}
