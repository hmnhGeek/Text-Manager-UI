"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import styles from './signup.module.css';

const SignupPage: React.FC = () => {
    return (
        <div className={styles.signupContainer}>
            <div className={styles.signupForm}>
                <h2 className={styles.formTitle}>Create an Account</h2>
                <form>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="username">Username</label>
                        <input className={styles.formInput} type="text" id="username" name="username" placeholder="Enter your username" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="password">Password</label>
                        <input className={styles.formInput} type="password" id="password" name="password" placeholder="Enter your password" required />
                    </div>
                    <button className={styles.submitButton} type="submit">Sign Up</button>
                </form>
                <div className={styles.loginLink}>
                    Already have an account? &nbsp;
                    <Link href="/login" className={styles.formLink}>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;