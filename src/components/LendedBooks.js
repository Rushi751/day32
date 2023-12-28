import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Api } from './GlobalApi';

export const LendedBooks = () => {
  const [loanedData, setLoanedData] = useState([]);
  const [refreshPage, setRefreshPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(`${Api}/allorders/books`);
        setLoanedData(response.data);
      } catch (error) {
        console.error('Error fetching loaned books:', error);
        setError('An error occurred while fetching loaned books.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [refreshPage]);

  const handleReturn = async (id) => {
    try {
      const response = await axios.put(`${Api}/returned/${id}`);
      if (response.status === 200) {
        alert(response.data);
        setRefreshPage(!refreshPage);
      }
    } catch (error) {
      console.error('Error handling return:', error);
      alert('Failed to handle the return. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <table style={{ textAlign: 'center' }} className="table">
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