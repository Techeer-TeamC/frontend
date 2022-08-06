import axios from 'axios';
import {
    REGISTER_USER
} from './types';
import {
    LOGIN_USER
} from './types';


export function registerUser(dataToSubmit) {
    const data = axios.post('api경로넣어주기', dataToSubmit)
        .then(response =>response.data )
  
    return {
      type: REGISTER_USER,
      payload: data,
    };
  }


export function loginUser(dataToSubmit) {
        const request = axios.post('api경로넣어주기', dataToSubmit)
        .then(response =>response.data )

        return {
            type: LOGIN_USER,
            payload: request
        }
}

