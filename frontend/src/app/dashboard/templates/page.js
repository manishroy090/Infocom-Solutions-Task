"use client";
import React, { useEffect, useState } from 'react';
import AddCardIcon from '@mui/icons-material/AddCard';
import ClassIcon from '@mui/icons-material/Class';
import { motion } from "framer-motion";

export default function Page() {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/api/templates/index`, {
        method: "GET",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await response.json();
      setTemplates(data.templates);
    };
    fetchTemplates();
  }, []);

  return (
    <div className="text-gray-900 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Templates</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Add New Template Card */}
        <motion.a 
          href='/dashboard/templates/create'
          className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <AddCardIcon className="text-blue-500 text-5xl mb-2"/>
          <span className="text-lg font-medium text-gray-700">Create Template</span>
        </motion.a>

        {/* Template Cards */}
        {templates.length > 0 && templates.map((item) => (
          <motion.div 
            key={item.id}
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            whileHover={{ scale: 1.03 }}
          >
            <ClassIcon className="text-green-500 text-5xl mb-2"/>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h2>
            <a 
              href={`/dashboard/templates/edit/${item.id}`} 
              className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition"
            >
              Edit
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
