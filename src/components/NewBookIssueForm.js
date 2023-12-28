import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Api } from './GlobalApi';

const NewBookIssueForm = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.number().required('Phone Number is required'),
    book: Yup.string().required('Book Name is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().required('End date is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      book: '',
      startDate: '',
      endDate: '',
    },
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  async function handleSubmit(values, { resetForm }) {
    try {
      const response = await axios.post(`${Api}/newissue`, { order: values });
      alert(response.data);
      resetForm();
    }  catch (error) {
        console.error('Error submitting new book issue:', error);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        }
        alert('Failed to submit the form. Please try again.');
      }
  }

  return (
    <div className="outter-container">
      <div className="issue-book-form-container">
        <h1>Issue book to a User</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Issuer Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}

          {/* Other form fields go here */}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NewBookIssueForm;
