import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Api } from './GlobalApi'
import { useNavigate } from 'react-router-dom'

export const BookList = () => {
 const [bookData, setBookData]=useState([])

useEffect(()=>{
axios.get(`${Api}/allbooks`)
.then((res)=>setBookData(res.data))
},[])



  return (
    <div className='book-list' style={{display:"flex", flexWrap:"wrap", gap:"30px", justifyContent:"center" } }>
        {bookData.map((e)=>  <BookCard id={e._id} key={e._id} book={e.book} author={e.author} language={e.language} url={e.url} />)
        }
    </div>
  )
}

const BookCard=({book,author,language,url,id})=>{
    const navigate=useNavigate()
    return(
        <>
        <div className='book-card'>
            <div className='img-container'>         
                   <img src={url} alt='book'/>
            </div>
            <div>
                <div>Book Name : {book}</div>
                <div>Author : {author} </div>
                <div>Language : {language} </div>
            </div>
            <button onClick={()=>navigate(`/book/${id}`)} >More info</button>
        </div>
        </>
    )
}