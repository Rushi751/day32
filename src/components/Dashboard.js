import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { Api } from './GlobalApi';



export const Dashboard = () => {
  const [totalBooks, setTotalBooks] = useState('');
  const [availableBooks, setAvailableBooks] = useState('');
  const [Members,setMembers]=useState("")
  const [loanedData,setLoanedData]=useState([])

  const fetchingLoanned=async()=>{
    const res= await axios.get(`${Api}/allorders/books`)
    setLoanedData(res.data)
  }

  useEffect(() => {
    axios.get(`${Api}/allbooks`).then( (res) => {
      setTotalBooks(res.data.length);
      setAvailableBooks(res.data.length - loanedData.length);
    });
  axios.get(`${Api}/allusers`).then((res)=>{
    setMembers(res.data.length)
    fetchingLoanned()
  })
  }, [loanedData.length]);



  const navigate=useNavigate()
  return (
    <div className="dashboard">
    <h1>Welcome to Library Management</h1>
    <div className="dashboard-container">
      <div onClick={()=>navigate("/booklist")} className="dashboard-card">
        <div className='dashboard-img' style={{height:"330px"}}>
          <img style={{width:"300px"}} src='https://th.bing.com/th/id/OIP.dpmOPlxzV2l2WTp9BqZdJQHaE7?w=282&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7' alt="book" />
        </div>
        <div style={{alignSelf:"bottom"}}>
        <h2>BOOKS</h2>
        <p>Total Books: {totalBooks}</p>
        <p>Available Books: {availableBooks}</p>
        </div>
      </div>
      <div  onClick={()=>navigate("/members")} className="dashboard-card">
      <div className='dashboard-img'>
          <img style={{width:"300px"}} src='https://th.bing.com/th/id/OIP.GdQwAl_CHGtDWk2I33khgwHaHa?w=171&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' alt="book" />
        </div>
      
        <h2>MEMBERS</h2>
        <p>Total Members: {Members}</p>
      </div>
      <div onClick={()=>navigate("/loaned/books")} className="dashboard-card">
      <div className='dashboard-img'>
          <img style={{width:"300px", height:"330px"}} src='https://th.bing.com/th?id=OIP.zQcfqp-bXbgkr4398ElNaQHaJp&w=219&h=285&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2' alt="book" />
        </div>
    
        <h2>LOAN</h2>
        <p>Total Loan:{loanedData.length}</p>
      </div>
    </div>
  </div>
  )
}