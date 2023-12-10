import { useFormik } from 'formik';
import React, {useEffect} from 'react';
import * as Yup from 'yup';
import cookie from 'js-cookie';
import styles from './AddPromptForm.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import { AppDispatch, RootState } from '@/redux/store';
import { addPrompt } from '@/redux/actions/addPromptActions';
import { connect } from 'react-redux';
import { PromptObjectResponseType } from '@/redux/initialStates/addPromptInitialState';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const validationSchema = Yup.object(
    {
        platformUrl: Yup.string().required("Platform name is required!"),
        title: Yup.string().required("Title is required!"),
        prompt: Yup.string().required("Prompt is required!"),
    }
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
};

interface AddPromptFormProps {
    token: string | null;
    currentPlatform: string;
    submitInProgress: boolean;
    addPromptError: PromptObjectResponseType | null;
    allAvailableTitles: string[];
    addPrompt: (token: string, promptData: {platformUrl: string, title: string, prompt: string}) => void;
}

const AddPromptForm: React.FC<AddPromptFormProps> = props => {
    let { allAvailableTitles } = props;

    const formik = useFormik(
        {
            initialValues: {
                platformUrl: props.currentPlatform,
                title: "",
                prompt: ""
            },
            validationSchema: validationSchema,
            onSubmit: values => {
                if(props.token) props.addPrompt(props.token, values);
                formik.resetForm();
            }
        }
    );

    useEffect(() => {
        if(props.addPromptError) {
            cookie.set("apiError", props.addPromptError.message);
            window.location.replace("/login");
        }
    }, [props.addPromptError]);

    const handleChange = (event: any) => {
        const {
          target: { value },
        } = event;
        formik.setFieldValue('title', value);
    };

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <FormControl sx={{ m: 0, width: 260 }} size='small'>
                    <InputLabel id="demo-multiple-name-label">Title</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={[formik.values.title]}
                        onChange={handleChange}
                        input={<OutlinedInput label="Title" />}
                        MenuProps={MenuProps}
                    >
                    {allAvailableTitles.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                        >
                        {name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <br />
                <br />
                {
                    formik.touched.title && formik.errors.title && (
                    <div className={styles.error}>{formik.errors.title}</div>
                    )
                }

                <label className={styles.addlabel}>
                Prompt:
                <textarea
                    value={formik.values.prompt}
                    name='prompt'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${styles.promptTextArea} ${formik.touched.prompt && formik.errors.prompt ? styles.errorHighlight : ''}`}
                />
                {
                    formik.touched.prompt && formik.errors.prompt && (
                    <div className={styles.error}>{formik.errors.prompt}</div>
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
      submitInProgress: state.addPrompt.loading,
      addPromptError: state.addPrompt.error,
    };
};
  
const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
      addPrompt: (token: string, promptData: {platformUrl: string, title: string, prompt: string}) => dispatch(addPrompt(token, promptData)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPromptForm);