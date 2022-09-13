import {
  GET_USER,
  GET_USER_ERROR,
  GET_USER_LOADING,
  GET_USER_RESET,
  GET_ALL_USERS_ERROR,
  GET_ALL_USERS,
  GET_ALL_USERS_LOADING,
  GET_ALL_USERS_RESET,
  SEARCH_FRIENDS_RESET,
  SEARCH_FRIENDS_ERROR,
  SEARCH_FRIENDS_LOADING,
  SEARCH_FRIENDS,
  PROCESS_REQUEST,
  PROCESS_REQUEST_RESET,
  PROCESS_REQUEST_LOADING,
  PROCESS_REQUEST_ERROR,
  CHANGE_VISIBILITY,
  CHANGE_VISIBILITY_ERROR,
  CHANGE_VISIBILITY_LOADING,
  CHANGE_VISIBILITY_RESET,
  USER_REQUEST,
  USER_REQUEST_ERROR,
  USER_REQUEST_LOADING,
  USER_REQUEST_RESET,
  USER_PROFILE,
  USER_PROFILE_ERROR,
  USER_PROFILE_LOADING,
  USER_PROFILE_RESET,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  UPDATE_USER_LOADING,
  UPDATE_USER_RESET,

  GET_USER_BY_USER_NAME,
  GET_USER_BY_USER_NAME_ERROR,
  GET_USER_BY_USER_NAME_LOADING,
  GET_USER_BY_USER_NAME_RESET,
} from "../actions/user/user.type";

const initial_state = {
  error: null,
  data: null,
  loading: true,
};

export const userProfileReducer = (
  state = {
    error: null,
    data: {},
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case USER_PROFILE_RESET:
      return {
        error: null,
        data: {},
        loading: false,
      };
    case USER_PROFILE:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case USER_PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case USER_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const userByUserNameReducer = (
  state = {
    error: null,
    data: {},
    loading: false,
    success: false
  },
  action
) => {
  switch (action.type) {
    case GET_USER_BY_USER_NAME_RESET:
      return {
        error: null,
        data: {},
        loading: false,
        success: false
      };
    case GET_USER_BY_USER_NAME:
      return {
        ...state,
        data: action.payload,
        loading: false,
        success: true
      };
    case GET_USER_BY_USER_NAME_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: true
      };
    case GET_USER_BY_USER_NAME_LOADING:
      return {
        ...state,
        loading: true,
        success: false
      };
    default:
      return state;
  }
};

export const userReducer = (state = initial_state, action) => {
  switch (action.type) {
    case GET_USER_RESET:
      return initial_state;
    case GET_USER:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const getAllUserReducer = (state = initial_state, action) => {
  switch (action.type) {
    case GET_ALL_USERS_RESET:
      return initial_state;
    case GET_ALL_USERS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GET_ALL_USERS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_ALL_USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const searchUserReducer = (
  state = {
    error: null,
    data: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case SEARCH_FRIENDS_RESET:
      return {
        error: null,
        data: [],
        loading: false,
      };
    case SEARCH_FRIENDS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case SEARCH_FRIENDS_ERROR:
      return {
        ...state,
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

export const processRequestReducer = (
  state = {
    error: null,
    data: false,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case PROCESS_REQUEST_RESET:
      return {
        error: null,
        data: false,
        loading: false,
      };
    case PROCESS_REQUEST:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case PROCESS_REQUEST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case PROCESS_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const changeVisibilityReducer = (
  state = {
    error: null,
    data: false,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case CHANGE_VISIBILITY_RESET:
      return {
        error: null,
        data: false,
        loading: false,
      };
    case CHANGE_VISIBILITY:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case CHANGE_VISIBILITY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CHANGE_VISIBILITY_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const userRequestReducer = (
  state = {
    error: null,
    data: {},
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case USER_REQUEST_RESET:
      return {
        error: null,
        data: {},
        loading: false,
      };
    case USER_REQUEST:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case USER_REQUEST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case USER_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const updateUserReducer = (
  state = {
    error: null,
    data: false,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_USER_RESET:
      return {
        error: null,
        data: false,
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPDATE_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
