import React from 'react';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import axios from 'axios';
import { Api } from './GlobalApi';

export const NewUserForm = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email("Not a valid email").required('Email is required'),
    phone: Yup.number().required('Phone Number is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    onSubmit: (values, { resetForm }) => {
      axios.post(`${Api}/newuser`, { user: values })
        .then((res) => alert(res.data))
        .then(() => resetForm());
    },
    validationSchema: validationSchema
  });

  return (
    <div className='outter-container'>
      <div className='form-container'>
        <h1> Add new User </h1>
        <label htmlFor='name'>Name</label>
        <input onChange={formik.handleChange} value={formik.values.name} placeholder='Name' name='name' type='text' />
        {formik.touched.name && formik.errors.name && (
          <div className='error'>{formik.errors.name}</div>
        )}
        <label htmlFor='email'>Email</label>
        <input onChange={formik.handleChange} value={formik.values.email} placeholder='E-mail' name='email' type='email' />
        {formik.touched.email && formik.errors.email && (
          <div className='error'>{formik.errors.email}</div>
        )}
        <label htmlFor='phone'>Phone Number</label>
        <input onChange={formik.handleChange} value={formik.values.phone} placeholder='Phone Number' name='phone' type='tel' />
        {formik.touched.phone && formik.errors.phone && (
          <div className='error'>{formik.errors.phone}</div>
        )}
        <button onClick={formik.handleSubmit} type='submit'>Submit</button>
      </div>
    </div>
  );
}
