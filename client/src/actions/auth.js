import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';


//action-creator returns a function instead of action . The function can now perform sideeffects such as asynchronous task . The function also can dispatch regular actions which will be handled by the reducers.
export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    router.push('/'); // after successful signin redirects to home page
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    router.push('/'); // after successful signup redirects to home page
  } catch (error) {
    console.log(error);
  }
};