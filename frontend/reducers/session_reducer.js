import { merge } from 'lodash';
import { SIGNUP, LOGOUT, LOGIN, RECEIVE_ERRORS } from '../actions/session_actions';

const defaultState = {
  user: {
    username: "",
    password: ""
  },
  errors: {}
};

const SessionReducer = (state = {}, action) => {

  Object.freeze(state);
  switch(action.type){
    case SIGNUP: return merge({}, state, {user: action.user});
    case LOGOUT: return {};
    case LOGIN: return merge({}, state, {user: action.user});
    case RECEIVE_ERRORS:
    return merge({}, state, {errors: action.errors.responseText});
    default: return state;
  }
};

export default SessionReducer;
