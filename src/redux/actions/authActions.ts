// src/redux/actions/authActions.ts
import api from '@/app/api/api';
import { Dispatch } from 'redux';
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess } from '../actionCreators/authActionCreators';

// Async action creators
export const login = (credentials: { username: string; password: string }) => {
  return async (dispatch: Dispatch) => {
    try {
        dispatch(loginStart());

        // Define the data you want to send as an object
        const data = {
            grant_type: '',
            username: credentials.username,
            password: credentials.password,
            scope: '',
            client_id: '',
            client_secret: '',
        };
        
        // Define headers
        const headers = {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const response = await api.post('/users/token', data, {headers});
        dispatch(loginSuccess(response.data.access_token));
    } catch (error: any) {
        dispatch(loginFailure(error.response.data.detail));
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(logoutStart());

      // Make the API call to log out
      await api.post('/users/logout');

      dispatch(logoutSuccess());
    } catch (error: any) {
      dispatch(logoutFailure(error.response.data.detail));
    }
  };
};
