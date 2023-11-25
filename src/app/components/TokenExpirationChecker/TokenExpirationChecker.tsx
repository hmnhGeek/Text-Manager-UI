"use client";

import { RootState } from '@/redux/store';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import cookie from 'js-cookie';

interface TokenExpirationCheckerProps {
    minutes: number | null;
    token: string | null;
}

const TokenExpirationChecker: React.FC<TokenExpirationCheckerProps> = (props) => {
    let { token, minutes } = props;

    const checkTokenExpiration = () => {
        if(token) {
            const decodedToken = parseJwt(token);
            if(decodedToken.exp * 1000 < Date.now()) {
                cookie.set("apiError", "Token has expired, please login again!");
                window.location.replace("/login");
            }
        }
    }

    const parseJwt = (token: string) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace('/_/g', "/");
        const jsonPayload = decodeURIComponent(
            atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
        );

        return JSON.parse(jsonPayload);
    }

    useEffect(() => {
        if(minutes) {
            const intervalId = setInterval(checkTokenExpiration, minutes * 60 * 1000);
            return () => clearInterval(intervalId);
        }
    }, [token]);

    return null;
}

const mapStateToProps = (state: RootState) => {
    return {
        token: state.auth.token
    };
}

export default connect(mapStateToProps, null)(TokenExpirationChecker);