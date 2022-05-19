import axios from 'axios';
import {
    LOGIN_USER
} from './types';
export function loginUser(dataToSubmit) {
        const request = axios.post('api경로넣어주기', dataToSubmit)
        .then(response =>response.data )

        return {
            type: LOGIN_USER,
            payload: request
        }
}