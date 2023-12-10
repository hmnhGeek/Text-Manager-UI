import React from 'react';
import styles from './UnlockTitlesForm.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object(
  {
    platformPwd: Yup.string().required("Password to decrypt prompts is required.")
  }
);

interface UnlockTitlesFormProps {
    platformName: string | null;
    setUnlockKeyFn: (unlockKey: string) => void;
}

const UnlockTitlesForm: React.FC<UnlockTitlesFormProps> = props => {
  const formik = useFormik(
    {
      initialValues: {
        platformPwd: "",
      },
      validationSchema: validationSchema,
      onSubmit: values => {
        props.setUnlockKeyFn(values.platformPwd);
        formik.resetForm();
      }
    }
  );

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label className={styles.addlabel}>
          Pass Key:
          <input
            type="password"
            value={formik.values.platformPwd}
            name='platformPwd'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${styles.addinput} ${formik.touched.platformPwd && formik.errors.platformPwd ? styles.errorHighlight : ''}`}
          />
          {
            formik.touched.platformPwd && formik.errors.platformPwd && (
              <div className={styles.error}>{formik.errors.platformPwd}</div>
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

export default UnlockTitlesForm;