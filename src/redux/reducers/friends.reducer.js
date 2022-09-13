import {
  GET_FRIENDS,
  GET_FRIENDS_ERROR,
  GET_FRIENDS_LOADING,
  GET_FRIENDS_RESET,
} from "../actions/friends/friend.type";

const initial_state = {
  error: null,
  data: null,
  loading: false,
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case GET_FRIENDS_RESET:
      return initial_state;
    case GET_FRIENDS:
      return {
        data: action.payload,
        loading: false,
      };
    case GET_FRIENDS_ERROR:
      return {
        error: action.payload,
        loading: false,
      };
    case GET_FRIENDS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
