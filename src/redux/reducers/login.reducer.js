import {
  LOGIN_USER_RESET,
  LOGIN_USER_ERROR,
  LOADING_LOGIN_USER,
  LOGIN_USER,
} from "../actions/auth/login/login.type";

const initial_state = {
  error: null,
  login_res: null,
  loading: false,
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case LOGIN_USER_RESET:
      return initial_state;
    case LOGIN_USER:
      return {
        login_res: action.payload,
        loading: false,
      };
    case LOGIN_USER_ERROR:
      return {
        error: action.payload,
        loading: false,
      };
    case LOADING_LOGIN_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
