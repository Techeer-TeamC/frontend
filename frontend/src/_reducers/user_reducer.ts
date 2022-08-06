import { REGISTER_USER } from "../_actions/types";
import {
    LOGIN_USER
} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case REGISTER_USER:
            return { ...state, success: action.payload };
            break;
        case LOGIN_USER:
            return {...state, success: action.payload};
            break;
      
        default:
            return state;
    }
  }

