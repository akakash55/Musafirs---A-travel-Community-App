import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH: // logsin or signin a user
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data }; // optional chaining operator
        case LOGOUT: // logsout a user
            localStorage.clear();
            return { ...state, authData: null }
        default:
            return state;
    }
}

export default authReducer;