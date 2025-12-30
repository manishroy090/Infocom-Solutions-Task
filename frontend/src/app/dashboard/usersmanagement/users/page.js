"use client";
import React, { useState,useEffect } from 'react';
import Table from '@/components/Table';
import Users from '../../../../../src/data/users.json'


export default function page() {
  const [colmns ,setColmns] = useState([]);
  const [users, setUser] = useState([]);

  useEffect(()=>{
    setColmns([
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Name', width: 130 },
      { field: 'email', headerName: 'Email', width: 150 },
      { field: 'role', headerName: 'Role', width: 130 },
    ]);
    setUser(Users);

  },[]);


  return (
    <div className='flex flex-col space-y-32'>
      <div className='flex  space-x-10'>

        <div className='bg-blue-600 h-20 w-52 rounded-md flex items-center justify-center'>
          <div className='flex space-x-4'>
           <h1 className=''>Total User</h1>
           <span>321</span>
          </div>
        </div>

        
        <div className='bg-blue-600 h-20 w-52 rounded-md flex items-center justify-center'>
          <div className='flex space-x-4'>
           <h1 className=''>Total User</h1>
           <span>321</span>
          </div>
        </div>

        
        <div className='bg-blue-600 h-20 w-52 rounded-md flex items-center justify-center'>
          <div className='flex space-x-4'>
           <h1 className=''>Total User</h1>
           <span>321</span>
          </div>
        </div>

      </div>
      <Table colmns={colmns} data={users}/>
    </div>
  )
}
