import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Api } from './GlobalApi'


export const Members = () => {
    const [userData,setuserData]=useState([])
    const [refreshPage,setRefreshPage]=useState(true)
      useEffect(()=>{
        async function fetch(){
         const res= await axios.get(`${Api}/allusers`)
          setuserData(res.data)
        }
        fetch()
      },[refreshPage])
      const handleReturn= async(id)=>{
    const res= await axios.delete(`${Api}/removeuser/${id}`)
        if(res.status===200){
          alert(res.data)
          setRefreshPage(!refreshPage)
        }
      }
      return (
        <div style={{display:"flex",justifyContent:"center"}}>
        <table style={{textAlign:"center"}} className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         { userData.map((e)=>(
          <tr key={e._id} >
          <td>{e?.name}</td>
          <td>{e?.phone}</td>
          <td>{e?.email}</td>
          <td><button onClick={()=>handleReturn(e._id)} className='return-button' >Remove</button> </td>
        </tr>
         ))}
    
        </tbody>
      </table>
      </div>
      )
    
}