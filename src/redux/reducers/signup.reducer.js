import {
  SIGNUP_USER_RESET,
  SIGNUP_USER_ERROR,
  LOADING_SIGNUP_USER,
  SIGNUP_USER,
} from "../actions/auth/signup/signup.type";

const initial_state = {
  error: null,
  data: null,
  loading: false,
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case SIGNUP_USER_RESET:
      return initial_state;
    case SIGNUP_USER:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case SIGNUP_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LOADING_SIGNUP_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
