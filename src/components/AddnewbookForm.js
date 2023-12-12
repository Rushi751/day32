import React  from 'react'
// eslint-disable-next-line no-unused-vars
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import { Api } from './GlobalApi'
export const AddnewbookForm = () => {
    const validationSchema = Yup.object().shape({
        book: Yup.string().required('Book Name is required'),
        author: Yup.string().required('Author is required'),
        language: Yup.string().required('Language is required'),
        year: Yup.string().required('Year of release is required'),
        url:Yup.string().url("invalid url").required("image url is reqired")
      });
    const formik= Formik({
        initialValues:{
            book:"",
            author:"",
            language:"",
            year:"",
            url:""
        },
        onSubmit: (values,{resetForm})=>{
            axios.post(`${Api}/newbook`,{book:values})
            .then((res)=>alert(res.data))
            .then(()=>resetForm())
        },
       validationSchema:validationSchema
    })


  return (
    <div className='outter-container'>
    <div className='issue-book-form-container'>
        <h1> Issue book to a User </h1>
        <label htmlFor='Book' >Book Name</label>
        <input onChange={formik.handleChange} value={formik.values.book} placeholder='Book Name' name='book' type='text' />
        {formik.touched.book && formik.errors.book && (
              <div className='error'>{formik.errors.book}</div>
            )}
        <label htmlFor='author' >Author</label>
        <input onChange={formik.handleChange} value={formik.values.author} placeholder='Author' name='author' type='text' />
        {formik.touched.author && formik.errors.author && (
              <div className='error'>{formik.errors.author}</div>
            )}
        <label htmlFor='language' >Language</label>
        <input onChange={formik.handleChange} value={formik.values.language} placeholder='Language' name='language' type='text' />
        {formik.touched.language && formik.errors.language && (
              <div className='error'>{formik.errors.language}</div>
            )}
        <label htmlFor='year' >Year of release</label>
        <input onChange={formik.handleChange} value={formik.values.year} placeholder='Year of release' name='year' type='text' />
        {formik.touched.year && formik.errors.year && (
              <div className='error'>{formik.errors.year}</div>
            )}
             <label htmlFor='url' >Image url</label>
        <input onChange={formik.handleChange} value={formik.values.url} placeholder='Image URl of the Book' name='url' type='text' />
        {formik.touched.url && formik.errors.url && (
              <div className='error'>{formik.errors.url}</div>
            )}
        <button onClick={formik.handleSubmit} type='submit'>Submit</button>
    </div>

</div>
  )
}