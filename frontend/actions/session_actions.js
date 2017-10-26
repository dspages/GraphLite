
export const LOGIN = "login";
export const LOGOUT = "logout";
export const SIGNUP = "signup";
export const RECEIVE_CURRENT_USER = "receivecurrentuser";
export const RECEIVE_ERRORS = "receiveerrors";

import { login,logout,signup } from '../util/api/session_api_util';

export const requestLogin = (user) => (dispatch) => {
  // console.log(user);
  return login(user).then(logged_in=>{
    dispatch(receiveLogin(logged_in));
    return logged_in;
  }).fail(err=>
    dispatch(receiveErrors(err)));
};

export const requestLogout = () => (dispatch) => {
  logout().then(()=>{
    dispatch(receiveLogout());
  });
};

export const requestSignup = (user) => (dispatch) => {
  return signup(user).success(logged_in => {
    dispatch(receiveLogin(logged_in));
    return logged_in;
  }).fail(err=>
    dispatch(receiveErrors(err)));
};

export const receiveLogout = ()=>({
  type: LOGOUT
});

export const receiveLogin = user =>({
  type: LOGIN,
  user :user
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors: errors
});
