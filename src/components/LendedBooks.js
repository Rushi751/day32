import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Api } from './GlobalApi'

export const LendedBooks = () => {
const [loanedData,setLoanedData]=useState([])
const [refreshPage,setRefreshPage]=useState(true)
  useEffect(()=>{
    async function fetch(){
     const res= await axios.get(`${Api}/allorders/books`)
      setLoanedData(res.data)
    }
    fetch()
  },[refreshPage])
  const handleReturn= async(id)=>{
const res= await axios.put(`${Api}/returned/${id}`)
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
      <th>Book</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
     { loanedData.map((e)=>(
      <tr key={e._id} >
      <td>{e?.book}</td>
      <td>{e?.name}</td>
      <td>{e?.phone}</td>
      <td>{e?.email}</td>
      <td>{e?.startDate}</td>
      <td>{e?.endDate}</td>
      <td><button onClick={()=>handleReturn(e._id)} className='return-button' >returned</button> </td>
    </tr>
     ))}

    </tbody>
  </table>
  </div>
  )
}