import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";



export default function RootLayout({ children }) {
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
