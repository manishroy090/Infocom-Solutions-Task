"use client"
import React, { useEffect, useState } from 'react';
import Table from '@/components/Table';
import Roles from '../../../../../src/data/roles.json'


export default function page() {
  const [colmns, setColmns] = useState([]);
  const [roles ,setRoles] = useState([]);

  useEffect(() => {
    setColmns([
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Roles', width: 130 },
      { field: 'description', headerName: 'Description', width: 130 },
  

    ]);
    setRoles(Roles);
  }, [])


  return (
    <div className='flex flex-col space-y-32'>
      <div className='flex  space-x-10'>

        <div className='bg-blue-600 h-20 w-52 rounded-md flex items-center justify-center'>
          <div className='flex space-x-4'>
            <h1 className=''>Total Roles</h1>
            <span>321</span>
          </div>
        </div>


        <div className='bg-blue-600 h-20 w-52 rounded-md flex items-center justify-center'>
          <div className='flex space-x-4'>
            <h1 className=''>Active Roles</h1>
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
      <Table colmns={colmns} data={roles}/>
    </div>
  )
}
