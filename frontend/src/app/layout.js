
"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  const token = localStorage.getItem('token');
  const router = useRouter();
  useEffect(() => {
    if (!token) {
       router.push('/login')
    }
  }, [token]);

  console.log();
  return (
    <html lang="en">
      <head>
        <meta name="csrf-token" content="{{ csrf_token() }}" />

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
