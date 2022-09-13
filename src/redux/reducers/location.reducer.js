import {
  GET_FRIENDS_LOCATION,
  GET_FRIENDS_LOCATION_ERROR,
  GET_FRIENDS_LOCATION_LOADING,
  GET_FRIENDS_LOCATION_RESET,
  SEND_LOCATION,
  SEND_LOCATION_RESET,
  SEND_LOCATION_ERROR,
  SEND_LOCATION_LOADING
} from "../actions/location/location.type";

const initial_state = {
  error: null,
  data: null,
  loading: false,
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case GET_FRIENDS_LOCATION_RESET:
      return initial_state;
    case GET_FRIENDS_LOCATION:
      return {
        data: action.payload,
        loading: false,
      };
    case GET_FRIENDS_LOCATION_ERROR:
      return {
        error: action.payload,
        loading: false,
      };
    case GET_FRIENDS_LOCATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
export const sendUserLocationReducer = (state = initial_state, action) => {  
  switch (action.type) {
    case SEND_LOCATION_RESET:
      return initial_state;
    case SEND_LOCATION:
      return {
        data: action.payload,
        loading: false,
      };
    case SEND_LOCATION_ERROR:
      return {
        error: action.payload,
        loading: false,
      };
    case SEND_LOCATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
