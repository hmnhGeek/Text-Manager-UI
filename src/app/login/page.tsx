"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import styles from './login.module.css'; // Import the CSS Module for styling

const LoginPage: React.FC = () => {
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
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Log In
          </button>
        </form>
        <div className={styles.signupLink}>
            Don't have an account? &nbsp;
            <Link href="/signup" className={styles.formLink}>
                Sign up
            </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
