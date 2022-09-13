import { SET_LOCATION_ACCURACY, SET_USER_LOCATION } from "./locationAccuracy.type";

export const setLocationAccuracy = (locationAccuracy, dispatch) => {
  dispatch({ type: SET_LOCATION_ACCURACY, payload: locationAccuracy });
};

export const setUserLocation = (location, dispatch) => {
  dispatch({type: SET_USER_LOCATION, payload: location})
}