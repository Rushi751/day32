import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='header'>
        <Link to="/dashboard"> Dashboard</Link>
        <Link to="/issuebook"> Issue</Link>
        <Link to="/newuser"> Add User</Link>
        <Link to="/booklist"> All Books</Link>
        <Link to="/newbookform">Add Book</Link>
        

    </div>
  )
}