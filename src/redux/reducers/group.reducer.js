import {
  ADD_GROUP,
  ADD_GROUP_ERROR,
  ADD_GROUP_LOADING,
  ADD_GROUP_RESET,
  PROCESS_GROUP_REQUEST,
  PROCESS_GROUP_REQUEST_ERROR,
  PROCESS_GROUP_REQUEST_LOADING,
  PROCESS_GROUP_REQUEST_RESET,
  REMOVE_FRIEND,
  REMOVE_FRIEND_ERROR,
  REMOVE_FRIEND_LOADING,
  REMOVE_FRIEND_RESET,
  ADD_MEMBERS,
  ADD_MEMBERS_ERROR,
  ADD_MEMBERS_LOADING,
  ADD_MEMBERS_RESET,
  DELETE_GROUP,
  DELETE_GROUP_ERROR,
  DELETE_GROUP_LOADING,
  DELETE_GROUP_RESET,
  UPDATE_GROUP,
  UPDATE_GROUP_ERROR,
  UPDATE_GROUP_LOADING,
  UPDATE_GROUP_RESET,
  CHANGE_GROUP_VISIBILITY,
  CHANGE_GROUP_VISIBILITY_ERROR,
  CHANGE_GROUP_VISIBILITY_LOADING,
  CHANGE_GROUP_VISIBILITY_RESET
} from "../actions/group/group.type";

export const addGroupReducer = (
  state = {
    error: null,
    data: false,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ADD_GROUP_RESET:
      return {
        error: null,
        data: false,
        loading: false,
      };
    case ADD_GROUP:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ADD_GROUP_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ADD_GROUP_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const processGroupReducer = (
  state = {
    error: null,
    data: false,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case PROCESS_GROUP_REQUEST_RESET:
      return {
        error: null,
        data: false,
        loading: false,
      };
    case PROCESS_GROUP_REQUEST:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case PROCESS_GROUP_REQUEST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case PROCESS_GROUP_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const changeGroupVisibilityReducer = (
  state = {
    error: null,
    data: false,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case CHANGE_GROUP_VISIBILITY_RESET:
      return {
        error: null,
        data: false,
        loading: false,
      };
    case CHANGE_GROUP_VISIBILITY:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case CHANGE_GROUP_VISIBILITY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CHANGE_GROUP_VISIBILITY_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const removeMemberReducer = (
  state = {
    error: null,
    data: false,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case REMOVE_FRIEND_RESET:
      return {
        error: null,
        data: false,
        loading: false,
      };
    case REMOVE_FRIEND:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case REMOVE_FRIEND_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case REMOVE_FRIEND_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const addMemberReducer = (
  state = {
    error: null,
    data: false,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ADD_MEMBERS_RESET:
      return {
        error: null,
        data: false,
        loading: false,
      };
    case ADD_MEMBERS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ADD_MEMBERS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ADD_MEMBERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const removeGroupReducer = (
  state = {
    error: null,
    data: false,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case DELETE_GROUP_RESET:
      return {
        error: null,
        data: false,
        loading: false,
      };
    case DELETE_GROUP:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case DELETE_GROUP_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case DELETE_GROUP_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};



export const updateGroupReducer = (
  state = {
    error: null,
    data: false,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_GROUP_RESET:
      return {
        error: null,
        data: false,
        loading: false,
      };
    case UPDATE_GROUP:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case UPDATE_GROUP_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPDATE_GROUP_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
