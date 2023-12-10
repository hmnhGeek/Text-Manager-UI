import { useFormik } from 'formik';
import React, {useEffect} from 'react';
import * as Yup from 'yup';
import cookie from 'js-cookie';
import styles from './AddTitleForm.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import { AppDispatch, RootState } from '@/redux/store';
import { addPlatform } from '@/redux/actions/addPlatformActions';
import { connect } from 'react-redux';

const validationSchema = Yup.object(
    {
        platformName: Yup.string().required("Platform name is required!"),
        title: Yup.string().required("Title is required!")
    }
);

interface AddTitleFormProps {
    token: string | null;
    currentPlatform: string;
    submitInProgress: boolean;
    addPlatformError: string | null;
    addPlatform: (token: string, platformData: {platformName: string, title: string}) => void;
}

const AddTitleForm: React.FC<AddTitleFormProps> = props => {
    const formik = useFormik(
        {
            initialValues: {
                platformName: props.currentPlatform,
                title: ""
            },
            validationSchema: validationSchema,
            onSubmit: values => {
                if(props.token) props.addPlatform(props.token, values);
                formik.resetForm();
            }
        }
    );

    useEffect(() => {
        if(props.addPlatformError) {
            cookie.set("apiError", props.addPlatformError);
            window.location.replace("/login");
        }
    }, [props.addPlatformError]);

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label className={styles.addlabel}>
                Title:
                <input
                    type="text"
                    value={formik.values.title}
                    name='title'
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
                <button disabled={props.submitInProgress} type='submit' className={styles.submitButton}>
                {props.submitInProgress ? <CircularProgress style={{ color: 'white' }} size={20} /> : "Submit"}
                </button>
            </form>
        </div>
    );
}

const mapStateToProps = (state: RootState) => {
    return {
      token: state.auth.token,
      submitInProgress: state.addPlatform.loading,
      addPlatformError: state.addPlatform.error,
    };
};
  
const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
      addPlatform: (token: string, platformData: {platformName: string, title: string}) => dispatch(addPlatform(token, platformData)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTitleForm);