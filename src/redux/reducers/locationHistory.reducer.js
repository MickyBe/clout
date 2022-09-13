import {
  GET_LOCATION_HISTORY,
  GET_LOCATION_HISTORY_RESET,
  GET_LOCATION_HISTORY_LOADING,
  GET_LOCATION_HISTORY_ERROR,
  SAVE_TRIP_HISTORY,
  SAVE_TRIP_HISTORY_ERROR,
  SAVE_TRIP_HISTORY_LOADING,
  SAVE_TRIP_HISTORY_RESET,
  GET_SAVE_TRIP_HISTORY,
  GET_SAVE_TRIP_HISTORY_ERROR,
  GET_SAVE_TRIP_HISTORY_LOADING,
  GET_SAVE_TRIP_HISTORY_RESET,

  DELETE_TRIP_HISTORY,
  DELETE_TRIP_HISTORY_LOADING,
  DELETE_TRIP_HISTORY_ERROR,
  DELETE_TRIP_HISTORY_RESET,
} from "../actions/locationHistory/locationHistory.type";

export const getLocationHistoryReducer = (
  state = {
    error: null,
    data: [],
    loading: false,
    loaded: false,
  },
  action
) => {
  switch (action.type) {
    case GET_LOCATION_HISTORY_RESET:
      return {
        error: null,
        data: [],
        loading: false,
        loaded: false,
      };
    case GET_LOCATION_HISTORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true,
      };
    case GET_LOCATION_HISTORY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loaded: true,
      };
    case GET_LOCATION_HISTORY_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    default:
      return state;
  }
};



export const saveTripsReducer = (
  state = {
    error: null,
    data: [],
    loading: false,
    loaded: false,
  },
  action
) => {
  switch (action.type) {
    case SAVE_TRIP_HISTORY_RESET:
      return {
        error: null,
        data: [],
        loading: false,
        loaded: false,
      };
    case SAVE_TRIP_HISTORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true,
      };
    case SAVE_TRIP_HISTORY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loaded: true,
      };
    case SAVE_TRIP_HISTORY_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    default:
      return state;
  }
};


export const getSaveTripReducer = (
  state = {
    error: null,
    data: [],
    loading: true,
    loaded: false,
  },
  action
) => {
  switch (action.type) {
    case GET_SAVE_TRIP_HISTORY_RESET:
      return {
        error: null,
        data: [],
        loading: false,
        loaded: false,
      };
    case GET_SAVE_TRIP_HISTORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true,
      };
    case GET_SAVE_TRIP_HISTORY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loaded: true,
      };
    case GET_SAVE_TRIP_HISTORY_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    default:
      return state;
  }
};


export const deleteSavedTripReducer = (
  state = {
    error: null,
    data: {},
    loading: false,
    loaded: false,
  },
  action
) => {
  switch (action.type) {
    case DELETE_TRIP_HISTORY_RESET:
      return {
        error: null,
        data: [],
        loading: false,
        loaded: false,
      };
    case DELETE_TRIP_HISTORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true,
      };
    case DELETE_TRIP_HISTORY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loaded: true,
      };
    case DELETE_TRIP_HISTORY_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    default:
      return state;
  }
};
