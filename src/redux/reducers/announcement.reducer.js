import {
  ADD_ANNOUNCEMENT,
  ADD_ANNOUNCEMENT_RESET,
  ADD_ANNOUNCEMENT_LOADING,
  ADD_ANNOUNCEMENT_ERROR,
  GET_ANNOUNCEMENTS,
  GET_ANNOUNCEMENTS_ERROR,
  GET_ANNOUNCEMENTS_LOADING,
  GET_ANNOUNCEMENTS_RESET,
} from "../actions/announcement/announcement.type";

export const addAnnouncementReducer = (
  state = {
    error: null,
    data: false,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ADD_ANNOUNCEMENT_RESET:
      return {
        error: null,
        data: false,
        loading: false,
      };
    case ADD_ANNOUNCEMENT:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ADD_ANNOUNCEMENT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ADD_ANNOUNCEMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const getAnnouncementsReducer = (
  state = {
    error: null,
    data: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case GET_ANNOUNCEMENTS_RESET:
      return {
        error: null,
        data: [],
        loading: false,
      };
    case GET_ANNOUNCEMENTS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GET_ANNOUNCEMENTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_ANNOUNCEMENTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
