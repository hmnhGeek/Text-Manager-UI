"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import styles from './login.module.css';
import cookie from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import api from '../api/api';
import { logInSuccess } from '@/redux/features/authSlice';
import {useDispatch} from "react-redux";
import { AppDispatch } from '@/redux/store';

const LoginPage: React.FC = () => {
    const [formData, setFormData] = React.useState({username: "", password: ""});
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const login = async () => {
        const {username, password} = formData;

        if(username && password) {
            try {
                 // Define the data you want to send as an object
                const data = {
                    grant_type: '',
                    username: username,
                    password: password,
                    scope: '',
                    client_id: '',
                    client_secret: '',
                };
                
                // Define headers
                const headers = {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                };
                
                let response = await api.post("/users/token", data, {headers});

                if(response.data.access_token) {
                    cookie.set('token', response.data.access_token);
                    dispatch(logInSuccess(username));
                    router.push("/temp");
                }
                else if(response.data.message)
                    toast.success(response.data.message);
            }
            catch (err: any) {
                toast.error(err.response.data.detail);
            }
        }
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <h2 className={styles.formTitle}>Log In</h2>
                <form>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className={styles.formInput}
                            placeholder="Enter your username"
                            required
                            onChange={(event) => setFormData(c => ({...c, username: event?.target.value}))}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={styles.formInput}
                            placeholder="Enter your password"
                            required
                            onChange={(event) => setFormData(c => ({...c, password: event?.target.value}))}
                        />
                    </div>
                    
                </form>
                <button onClick={login} className={styles.submitButton}>
                        Log In
                    </button>
                <div className={styles.signupLink}>
                    Don't have an account? &nbsp;
                    <Link href="/signup" className={styles.formLink}>
                        Sign up
                    </Link>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default LoginPage;
