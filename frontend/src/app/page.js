"use client";

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const {user, loading} = useAuth();
  const router = useRouter();


  useEffect(()=>{
    if(loading) return;
    if(user){
      router.replace('/dashboard')
    }
    else{
            router.replace("/login");
    }
  },[loading,user]);


  return null;

}
