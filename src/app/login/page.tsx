"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import styles from './login.module.css';
import cookie from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

const LoginPage: React.FC = () => {
    const [formData, setFormData] = React.useState({username: "", password: ""});

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

                let response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/users/token`, 
                    data,
                    {headers}
                );
                
                cookie.set('token', response.data.access_token);
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