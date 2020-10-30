import {SIGN_IN, SIGN_OUT} from '../action/action';
import {initialState} from '../store/store'

export default function authReducers(state=initialState, action) {
    switch (action.type) {
        case SIGN_IN: 
            return {
                ...state, 
                isloggedin : true, 
                signedinemail : action.email, 
                firstname : action.firstname,
                lastname : action.lastname,
            }
        case SIGN_OUT:
            return {
                ...state, 
                isloggedin: false, 
                signedinemail: "", 
                firstname: "", 
                lastname: ""
            }
        default: 
            return state;
    }
}