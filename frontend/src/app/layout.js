
"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";




export default function RootLayout({ children }) {

  // const router = useRouter();

  // useEffect(()=>{
  //     router.push("/login");
  // },[])


  return (
    <html lang="en">
      <head>
        <meta name="csrf-token" content="{{ csrf_token() }}"/>

      </head>
      <body
      >
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
