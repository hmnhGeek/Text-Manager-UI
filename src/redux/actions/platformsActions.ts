import api from '@/app/api/api';
import { Dispatch } from 'redux';
import { fetchAvailablePlatformsStart, fetchAvailablePlatformsSuccess, fetchAvailablePlatformsError } from '../actionCreators/platformsActionCreators';

export const fetchAvailablePlatforms = (token: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetchAvailablePlatformsStart());
            const response = await api.get(`/prompt_manager/get_all_platforms`, {
                headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            dispatch(fetchAvailablePlatformsSuccess(response.data));
        } catch (error: any) {
            dispatch(fetchAvailablePlatformsError(error.response.data.detail));
        }
    }
}