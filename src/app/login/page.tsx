"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import styles from './login.module.css';
import cookie from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import api from '../api/api';
import { logInSuccess } from '@/redux/features/authSlice';
import {useDispatch, useSelector} from "react-redux";
import { login, logout } from '@/redux/actions/authActions';
import { RootState, AppDispatch } from '@/redux/store';

const LoginPage: React.FC = () => {
    const [formData, setFormData] = React.useState({username: "", password: ""});
    const { token, isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        let apiError = cookie.get("apiError");

        if(apiError) {
            toast.error(apiError);
            cookie.remove("apiError");
        }
    }, []);

    const handleLogin = async () => {
        await dispatch(login(formData));
    };

    useEffect(() => {
        if(token) {
            router.push("/platforms");
        }
    }, [token]);

    useEffect(() => {
        if(error)
            toast.error(error);
    }, [error]);

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
                <button onClick={handleLogin} className={styles.submitButton}>
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
