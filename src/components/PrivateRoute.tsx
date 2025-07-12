"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isLoginPage = pathname === "/login";

    if (!isLoading && !user && !isLoginPage) {
      router.push("/login");
    }

    // Jika sudah login dan akses login page, redirect ke home
    if (!isLoading && user && isLoginPage) {
      router.push("/home");
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat...</p>
      </div>
    );
  }

  return <>{children}</>;
}
