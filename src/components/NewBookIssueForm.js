import React from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import { Api } from './GlobalApi'

export const NewBookIssueForm = () => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.number().required('Phone Number is required'),
        book: Yup.string().required('Book Name is required'),
        startDate: Yup.date().required('start date is required'),
        endDate: Yup.date().required('end date is required')
    });
    const formik = Formik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            book: "",
            startDate:"",
            endDate:""
        },
        onSubmit: (values,{resetForm})=>{
            axios.post(`${Api}/newissue`,{order:values})
            .then((res)=>alert(res.data))
            .then(()=>resetForm())
        },
        validationSchema: validationSchema
    })

    return (
        <div className='outter-container'>
            <div className='issue-book-form-container'>
                <h1> Issue book to a User </h1>
                <label htmlFor='name' >Issuer Name</label>
                <input onChange={formik.handleChange} value={formik.values.name} placeholder='Name' name='name' type='text' />
                {formik.touched.name && formik.errors.name && (<div className='error'>{formik.errors.name}</div>)}
                <label htmlFor='email' >Email</label>
                <input onChange={formik.handleChange} value={formik.values.email} placeholder='E-mail' name='email' type='email' />
                {formik.touched.email && formik.errors.email && (<div className='error'>{formik.errors.email}</div>)}
                <label htmlFor='phone' >Phone Number</label>
                <input onChange={formik.handleChange} value={formik.values.phone} placeholder='Phone Number' name='phone' type='tel' />
                {formik.touched.phone && formik.errors.phone && (<div className='error'>{formik.errors.phone}</div>)}
                <label htmlFor='Book' >Book Name</label>
                <input onChange={formik.handleChange} value={formik.values.book} placeholder='Book Name' name='book' type='text' />
                {formik.touched.book && formik.errors.book && (
                    <div className='error'>{formik.errors.book}</div>
                )}
                <div style={{display:"flex",justifyContent:"space-around"}}>
                <label htmlFor='startDate' >Start date</label>
                <input name='startDate' type='date' value={formik.values.startDate} onChange={formik.handleChange}/>
               
                <label htmlFor='endDate' >End date</label>
                <input name='endDate' type='date' value={formik.values.endDate} onChange={formik.handleChange}/>
            
                </div>
                <div style={{display:"flex",justifyContent:"space-around"}} >
                {formik.touched.startDate && formik.errors.startDate && (
                    <div className='error'>{formik.errors.startDate}</div>
                )}
                    {formik.touched.endDate && formik.errors.endDate && (
                    <div className='error'>{formik.errors.endDate}</div>
                )}
                </div>
                <button onClick={formik.handleSubmit} type='submit'>Submit</button>
            </div>

        </div>
    )
}