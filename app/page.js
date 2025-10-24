'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  // Client-side redirect to /login so root shows the login page
  const router = useRouter();
  useEffect(() => {
    router.replace("/login");
  }, [router]);
  return null;
}
