"use client";
import React, { useEffect, useState } from 'react'
import AddCardIcon from '@mui/icons-material/AddCard';
import ClassIcon from '@mui/icons-material/Class';

export default function page() {

  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/templates/index`);
      const data = await response.json();
      setTemplates(data.templates);
    }
    fetchTemplates();
  }, [])


  return (
    <div className='text-black'>
      <h1>Create Templates</h1>

      <div className='flex flex-wrap space-x-8'>
        <a href='/dashboard/templates/create'>
          <div className='p-4 shadow-2xl w-fit h-20 flex items-center justify-center border px-8'>
            <AddCardIcon />
          </div>

        </a>

        {templates.length > 0 && templates.map((item) => (
          <div>
            <div className='p-4 shadow-2xl w-fit h-20 flex items-center justify-center border px-8'>
              <ClassIcon />
            </div>
            <span>{item.name}</span>
            <a href={`/dashboard/templates/edit/${item.id}`}>
              <div>edit</div>
            </a>

          </div>
        ))}

      </div>
    </div>
  )
}
