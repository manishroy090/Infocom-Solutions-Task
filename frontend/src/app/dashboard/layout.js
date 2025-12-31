"use client"
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function RootLayout({ children }) {
   const {setUser,user, loading ,setToken,token} = useAuth();
 
  return (
      <div className="h-screen overflow-hidden">
        <div className="flex h-full">

          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 ml-64 h-screen overflow-y-auto bg-slate-100 p-4 text-black">
            {children}
          </main>

        </div>
      </div>
  
  );
}
