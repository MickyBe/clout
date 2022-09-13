import {
  GET_LOCATION_HISTORY,
  GET_LOCATION_HISTORY_ERROR,
  GET_LOCATION_HISTORY_LOADING,
  GET_LOCATION_HISTORY_RESET,
  SAVE_TRIP_HISTORY,
  SAVE_TRIP_HISTORY_LOADING,
  SAVE_TRIP_HISTORY_RESET,
  SAVE_TRIP_HISTORY_ERROR,
  GET_SAVE_TRIP_HISTORY,
  GET_SAVE_TRIP_HISTORY_LOADING,
  GET_SAVE_TRIP_HISTORY_ERROR,
  GET_SAVE_TRIP_HISTORY_RESET,
  DELETE_TRIP_HISTORY,
  DELETE_TRIP_HISTORY_LOADING,
  DELETE_TRIP_HISTORY_ERROR,
  DELETE_TRIP_HISTORY_RESET,
} from "./locationHistory.type";
import { baseUrl } from "../../../config/url/api.url";
import { apiHeader } from "../../../utility/api/headerConf";
import axios from "axios";

export const getLocationHistory = (data, dispatch) => {
  dispatch({ type: GET_LOCATION_HISTORY_RESET });
  dispatch({ type: GET_LOCATION_HISTORY_LOADING });
  axios
    .get(
      `${baseUrl}/location/date?start_date=${data.start_date}&end_date=${data.end_date}`,
      apiHeader()
    )
    .then((res) => dispatch({ type: GET_LOCATION_HISTORY, payload: res.data }))
    .catch((err) =>
      dispatch({ type: GET_LOCATION_HISTORY_ERROR, payload: err })
    );
};

export const resetLocationHistory = (dispatch) =>
  dispatch({ type: GET_LOCATION_HISTORY_RESET });

export const saveTripLocation = (data, dispatch) => {
  dispatch({ type: SAVE_TRIP_HISTORY_RESET });
  dispatch({ type: SAVE_TRIP_HISTORY_LOADING });
  axios
    .post(`${baseUrl}/saved-trips`, data, apiHeader())
    .then((res) => dispatch({ type: SAVE_TRIP_HISTORY, payload: res.data }))
    .catch((err) => dispatch({ type: SAVE_TRIP_HISTORY_ERROR, payload: err }));
};
export const resetSaveTripLocation = (dispatch) =>
  dispatch({ type: SAVE_TRIP_HISTORY_RESET });

export const getTrips = (dispatch) => {
  dispatch({ type: GET_SAVE_TRIP_HISTORY_RESET });
  dispatch({ type: GET_SAVE_TRIP_HISTORY_LOADING });
  axios
    .get(`${baseUrl}/saved-trips`, apiHeader())
    .then((res) => dispatch({ type: GET_SAVE_TRIP_HISTORY, payload: res.data }))
    .catch((err) =>
      dispatch({ type: GET_SAVE_TRIP_HISTORY_ERROR, payload: err })
    );
};
export const resetGetTrips = (dispatch) =>
  dispatch({ type: GET_SAVE_TRIP_HISTORY_RESET });



  export const deleteSavedTrip = (id, dispatch) => {
    dispatch({ type: DELETE_TRIP_HISTORY_RESET });
    dispatch({ type: DELETE_TRIP_HISTORY_LOADING });
    axios
      .delete(`${baseUrl}/saved-trips/${id}`, apiHeader())
      .then((res) => dispatch({ type: DELETE_TRIP_HISTORY, payload: res.data }))
      .catch((err) =>
        dispatch({ type: DELETE_TRIP_HISTORY_ERROR, payload: err })
      );
  };
  export const resetDeleteTrips = (dispatch) =>
    dispatch({ type: DELETE_TRIP_HISTORY_RESET });
