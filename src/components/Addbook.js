import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Api } from './GlobalApi';
import { useParams } from 'react-router-dom';



export const Addbook = () => {
  const { id } = useParams()

  const [book, setBook] = useState({});
  const [history, setHistory] = useState([]);
  

  useEffect(() => {
    const fetch = async () => {
      try {
        const res1 = await axios.get(`${Api}/book/${id}`);
        setBook(res1.data);
  
        const res2 = await axios.get(`${Api}/Order/${id}`);
        setHistory(res2.data);
      } catch (error) {
        console.error("Error fetching data:", error);
  
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error in request setup:", error.message);
        }
      }
    };
  
    fetch();
  }, [id]);
  

  return (
    <div className="page">
      <div className="banner">
        <div className="book-image">
          <img src={book?.url} alt="Book Cover" />
        </div>
        <div>
          <h1>Book Title: {book?.book}</h1>
          <p>Author's Name: {book?.author}</p>
          <p>Year Released: {book?.year}</p>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((e) => (
            <tr key={e._id}>
              <td>{e?.name}</td>
              <td>{e?.phone}</td>
              <td>{e?.email}</td>
              <td>{e?.startDate}</td>
              <td>{e?.endDate}</td>
              <td>{e.returned ? "Returned" : "Not Returned"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/*export const Addbook = () => {
  const { id } = useParams()

  const [book, setBook] = useState({})
  const [history, setHistory] = useState([])

  useEffect(() => {
    const fetch=async()=>{
const res1= await axios.get(`${Api}/book/${id}`)
         setBook(res1.data)
const res2= await  axios.get(`${Api}/Order/${id}`)
        setHistory(res2.data)
    }
      fetch()
  }, [id])




  return (
    <div className="page">
      <div className="banner">
        <div className="book-image">
          <img src={book.url} alt="Book Cover" />
        </div>
        <div>
          <h1>Book Title: {book.book}</h1>
          <p>Author's Name: {book.author}</p>
          <p>Year Released: {book.year}</p>

        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((e) => (
            <tr key={e._id}>
              
              <td>{e?.name}</td>
              <td>{e?.phone}</td>
              <td>{e?.email}</td>
              <td>{e?.startDate}</td>
              <td>{e?.endDate}</td>
             <td> {e.returned?"Returned":"not Returned"} </td>
            </tr>
          ))}

          
        </tbody>
      </table>
    </div>
  );
};*/
