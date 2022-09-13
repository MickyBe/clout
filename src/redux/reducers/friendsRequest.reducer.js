import {
  FRIEND_REQUEST_RECIEVED,
  FRIEND_REQUEST_RECIEVED_RESET,
  FRIEND_REQUEST_RECIEVED_ERROR,
  FRIEND_REQUEST_RECIEVED_LOADING,
  ACCEPT_REQUEST,
  ACCEPT_REQUEST_ERROR,
  ACCEPT_REQUEST_LOADING,
  ACCEPT_REQUEST_RESET,
  REJECT_REQUEST,
  REJECT_REQUEST_ERROR,
  REJECT_REQUEST_LOADING,
  REJECT_REQUEST_RESET,
  SEND_REQUEST,
  SEND_REQUEST_RESET,
  SEND_REQUEST_ERROR,
  SEND_REQUEST_LOADING,
  SEARCH_FRIENDS,
  SEARCH_FRIENDS_ERROR,
  SEARCH_FRIENDS_RESET,
  SEARCH_FRIENDS_LOADING,
} from "../actions/friendRequest/friendRequest.type";

const initial_state = {
  error: null,
  data: [],
  loading: false,
};

export const friendRequestReducer = (state = initial_state, action) => {
  switch (action.type) {
    case FRIEND_REQUEST_RECIEVED_RESET:
      return initial_state;
    case FRIEND_REQUEST_RECIEVED:
      return {
        data: action.payload,
        loading: false,
      };
    case FRIEND_REQUEST_RECIEVED_ERROR:
      return {
        error: action.payload,
        loading: false,
      };
    case FRIEND_REQUEST_RECIEVED_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const rejectFriendRequestReducer = (state = initial_state, action) => {
  switch (action.type) {
    case REJECT_REQUEST_RESET:
      return initial_state;
    case REJECT_REQUEST:
      return {
        data: action.payload,
        loading: false,
      };
    case REJECT_REQUEST_ERROR:
      return {
        error: action.payload,
        loading: false,
      };
    case REJECT_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const acceptFriendRequestReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ACCEPT_REQUEST_RESET:
      return initial_state;
    case ACCEPT_REQUEST:
      return {
        data: action.payload,
        loading: false,
      };
    case ACCEPT_REQUEST_ERROR:
      return {
        error: action.payload,
        loading: false,
      };
    case ACCEPT_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const sendFriendRequestReducer = (state = initial_state, action) => {
  switch (action.type) {
    case SEND_REQUEST_RESET:
      return initial_state;
    case SEND_REQUEST:
      return {
        data: action.payload,
        loading: false,
      };
    case SEND_REQUEST_ERROR:
      return {
        error: action.payload,
        loading: false,
      };
    case SEND_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const searchFriendReducer = (state = initial_state, action) => {
  switch (action.type) {
    case SEARCH_FRIENDS_RESET:
      return initial_state;
    case SEARCH_FRIENDS:
      return {
        data: action.payload,
        loading: false,
      };
    case SEARCH_FRIENDS_ERROR:
      return {
        error: action.payload,
        loading: false,
      };
    case SEARCH_FRIENDS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
