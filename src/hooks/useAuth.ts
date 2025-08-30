"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth(redirectTo?: string) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session && redirectTo) {
      router.push(redirectTo);
    }
  }, [session, status, router, redirectTo]);

  return {
    session,
    loading: status === "loading",
    authenticated: !!session,
  };
}

export function useRequireAuth(redirectTo: string = "/login") {
  return useAuth(redirectTo);
}
