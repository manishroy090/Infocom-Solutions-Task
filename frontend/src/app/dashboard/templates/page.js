"use client";
import React, { useEffect, useState } from 'react';
import AddCardIcon from '@mui/icons-material/AddCard';
import ClassIcon from '@mui/icons-material/Class';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import { motion } from "framer-motion";

export default function Page() {
  const [templates, setTemplates] = useState([]);

  const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/templates/index`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setTemplates(data.templates);
  };

 
  const exportExcel = (id) => {
  const token = localStorage.getItem('token');

  window.open(
    `http://127.0.0.1:8000/api/templates/${id}/export?token=${token}`,
    '_blank'
  );
  };

  
  const importExcel = async (e,id) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    const token = localStorage.getItem('token');
    await fetch(`http://127.0.0.1:8000/api/templates/${id}/import?token=${token}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    fetchTemplates();
  };


  const deleteTemplate = async (id) => {
    if (!confirm('Are you sure?')) return;

    await fetch(`http://127.0.0.1:8000/api/templates/delete/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  return (
   <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Templates</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* CREATE CARD */}
        <motion.a
          href="/dashboard/templates/create"
          className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow border hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <AddCardIcon className="text-blue-500 text-5xl mb-2" />
          <span>Create Template</span>
        </motion.a>

        {/* TEMPLATE CARDS */}
        {templates.map((item) => (
          <motion.div
            key={item.id}
            className="p-6 bg-white rounded-xl shadow border text-center"
            whileHover={{ scale: 1.03 }}
          >
            <ClassIcon className="text-green-500 text-5xl mb-2" />
            <h2 className="font-semibold mb-4">{item.name}</h2>

            <div className="flex flex-wrap justify-center gap-2">
              <a
                href={`/dashboard/templates/edit/${item.id}`}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Edit
              </a>

              <button
                onClick={() => exportExcel(item.id)}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              >
                <DownloadIcon fontSize="small" />
              </button>

              <label className="px-3 py-1 bg-yellow-500 text-white rounded text-sm cursor-pointer">
                <UploadFileIcon fontSize="small" />
                <input
                  type="file"
                  hidden
                  accept=".xlsx,.csv"
                  onChange={(e) => importExcel(e, item.id)}
                />
              </label>

         
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
