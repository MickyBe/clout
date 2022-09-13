import { SET_LOCATION_ACCURACY, SET_USER_LOCATION } from "../actions/locationAccuracy/locationAccuracy.type";

const initial_state = {
  locationAccuracy: "QUICKSTER",
};

export const locationAccuracyReducer =  (state = initial_state, action) =>  {
  switch (action.type) {
    case SET_LOCATION_ACCURACY:
      return {
        locationAccuracy: action.payload,
      };
    default:
      return state;
  }
}

export const userLocationReducer =  (state = initial_state, action) =>  {
  switch (action.type) {
    case SET_LOCATION_ACCURACY:
      return {
        user_location: action.payload,
      };
    default:
      return state;
  }
}
