"use Client"
import React ,{useEffect, useState} from 'react'

export default function page() {

  const [schema ,setSchema] = useState([]);
  useEffect(()=>{
  const fetchSchema = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/api/formsubmission/getschema`, {
        method: "GET",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await response.json();
      setSchema(data.templates);
    };
    fetchSchema();

  },[])

  return (
    <div>
      
    </div>
  )


}
