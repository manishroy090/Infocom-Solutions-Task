"use client"
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
    else if(role_name != "Admin"){

    }
    
  }, [loading, user]);
  if (loading) return null;

  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        <div className="flex h-full">

          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 ml-64 h-screen overflow-y-auto bg-slate-100 p-4">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}
