"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";



export default function login() {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw error("Login failed");
      }
      localStorage.setItem('token', data.access_token);
         const meRes = await fetch("http://127.0.0.1:8000/api/me", {
         headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });
    const user = await meRes.json();

      setUser(user);




    } catch (error) {


    }

  }

  useEffect(() => {

     if(user){
       router.replace("/dashboard");
     }
  }, [user, router]);


  return (
    <div className='bg-indigo-800 h-screen w-screen flex items-center justify-center'>
      <div className='h-fit w-96 border p-2 rounded flex-col  space-y-8'>


        <div className=' text-center'>
          <h1>Login</h1>
        </div>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="visitors"
              class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="" required />
          </div>

          <div>
            <label>Password</label>
            <input
              type="text"
              id="visitors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="" required />
          </div>

          <button type="submit" class="text-black w-full bg-white box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Login</button>
        </form>

        <div className='flex justify-center space-x-4 '>
          <span>Don't Have An Account</span>
          <a href='/signup'>Register Now</a>
        </div>

      </div>
    </div>
  )
}
