export const RECEIVE_ALL_USERS = "all_users";
import { allUsers } from "../util/api/user_api_util";

export const requestAllUsers = () => (dispatch) => {
  return allUsers()
    .then(users => dispatch(receiveAllUsers(users)));
};

export const receiveAllUsers = users => ({
  type: RECEIVE_ALL_USERS,
  users: users
});
