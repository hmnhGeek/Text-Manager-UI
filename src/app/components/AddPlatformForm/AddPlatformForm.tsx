import React, { useState } from 'react';
import styles from './AddPlatfromForm.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object(
  {
    platformName: Yup.string().required("Platform name is required!"),
    title: Yup.string().required("Title is required!")
  }
);

// interface AddPlatformFormProps {
//   onSubmit: (platformName: string, title: string) => void;
//   onCancel: () => void;
// }

const AddPlatformForm = () => {
  const formik = useFormik(
    {
      initialValues: {
        platformName: "",
        title: ""
      },
      validationSchema: validationSchema,
      onSubmit: values => {
        console.log(values);
        formik.resetForm();
      }
    }
  );

//   const handleSubmit = () => {
//     onSubmit(platformName, title);
//     setPlatformName('');
//     setTitle('');
//   };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label className={styles.addlabel}>
          Platform Name:
          <input
            type="text"
            value={formik.values.platformName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${styles.addinput} ${formik.touched.platformName && formik.errors.platformName ? styles.errorHighlight : ''}`}
          />
          {
            formik.touched.platformName && formik.errors.platformName && (
              <div className={styles.error}>{formik.errors.platformName}</div>
            )
          }
        </label>
        <label className={styles.addlabel}>
          Title:
          <input
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${styles.addinput} ${formik.touched.platformName && formik.errors.platformName ? styles.errorHighlight : ''}`}
          />
          {
            formik.touched.title && formik.errors.title && (
              <div className={styles.error}>{formik.errors.title}</div>
            )
          }
        </label>
        <button type='submit' className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPlatformForm;