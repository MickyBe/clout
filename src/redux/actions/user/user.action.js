import axios from "axios";
import {
  allUserUrl,
  baseUrl,
  searchUserUrl,
  userDataUrl,
  userProfileUrl,
  userRequest,
  userUrl,
} from "../../../config/url/api.url";
import { apiHeader, apiKeyHeader } from "../../../utility/api/headerConf";
import {
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  GET_ALL_USERS_LOADING,
  GET_ALL_USERS_RESET,
  GET_USER,
  GET_USER_ERROR,
  GET_USER_LOADING,
  GET_USER_RESET,
  PROCESS_REQUEST,
  PROCESS_REQUEST_ERROR,
  PROCESS_REQUEST_LOADING,
  PROCESS_REQUEST_RESET,
  CHANGE_VISIBILITY,
  CHANGE_VISIBILITY_ERROR,
  CHANGE_VISIBILITY_LOADING,
  CHANGE_VISIBILITY_RESET,
  SEARCH_FRIENDS,
  SEARCH_FRIENDS_ERROR,
  SEARCH_FRIENDS_LOADING,
  SEARCH_FRIENDS_RESET,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  UPDATE_USER_LOADING,
  UPDATE_USER_RESET,
  USER_PROFILE,
  USER_PROFILE_ERROR,
  USER_PROFILE_LOADING,
  USER_PROFILE_RESET,
  USER_REQUEST,
  USER_REQUEST_ERROR,
  USER_REQUEST_LOADING,
  USER_REQUEST_RESET,

  GET_USER_BY_USER_NAME,
  GET_USER_BY_USER_NAME_ERROR,
  GET_USER_BY_USER_NAME_LOADING,
  GET_USER_BY_USER_NAME_RESET,
} from "./user.type";

export const getUserProfile = (dispatch) => {
  dispatch({ type: USER_PROFILE_RESET });
  dispatch({ type: USER_PROFILE_LOADING });
  axios
    .get(userProfileUrl, apiHeader())
    .then((res) => dispatch({ type: USER_PROFILE, payload: res.data }))
    .catch((err) => dispatch({ type: USER_PROFILE_ERROR, payload: err }));
};

export const getUserByUserName = (userName, dispatch) => {
  dispatch({ type: GET_USER_BY_USER_NAME_RESET });
  dispatch({ type: GET_USER_BY_USER_NAME_LOADING });
  axios
    .get(userUrl + `/username/${userName.toLowerCase()}`, apiKeyHeader())
    .then((res) => { console.log(res.data); dispatch({ type: GET_USER_BY_USER_NAME, payload: res.data })})
    .catch((err) => dispatch({ type: GET_USER_BY_USER_NAME_ERROR, payload: err }));
};

export const getUserInformation = (dispatch, type = "user") => {
  dispatch({ type: GET_USER_RESET });
  dispatch({ type: GET_USER_LOADING });
  axios
    .get(type === "user" ? userDataUrl : userDataGroupUrl, apiHeader())
    .then((res) => dispatch({ type: GET_USER, payload: res.data }))
    .catch((err) => dispatch({ type: GET_USER_ERROR, payload: err }));
};

export const resetUserInformation = (dispatch) =>
  dispatch({ type: GET_USER_RESET });

export const getAllUsers = (dispatch) => {
  dispatch({ type: GET_ALL_USERS_RESET });
  dispatch({ type: GET_ALL_USERS_LOADING });
  axios
    .get(allUserUrl, apiHeader())
    .then((res) => dispatch({ type: GET_ALL_USERS, payload: res.data }))
    .catch((err) => dispatch({ type: GET_ALL_USERS_ERROR, payload: err }));
};

export const searchFriends = (key, dispatch) => {
  dispatch({ type: SEARCH_FRIENDS_RESET });
  dispatch({ type: SEARCH_FRIENDS_LOADING });
  axios
    .get(searchUserUrl + key, apiHeader())
    .then((res) => dispatch({ type: SEARCH_FRIENDS, payload: res.data }))
    .catch((err) => dispatch({ type: SEARCH_FRIENDS_ERROR, payload: err }));
};

export const processRequest = (type, friendId, dispatch) => {
  dispatch({ type: PROCESS_REQUEST_RESET });
  dispatch({ type: PROCESS_REQUEST_LOADING });
  axios
    .put(
      `${baseUrl}/users/process-request?type=${type}`,
      { friendId },
      apiHeader()
    )
    .then((res) => dispatch({ type: PROCESS_REQUEST, payload: res.data }))
    .catch((err) => dispatch({ type: PROCESS_REQUEST_ERROR, payload: err }));
};

export const resetProcessRequest = (dispatch) => dispatch({type: PROCESS_REQUEST_RESET})

export const changeVisibility = (type, friendId, userType, dispatch) => {
  dispatch({ type: CHANGE_VISIBILITY_RESET });
  dispatch({ type: CHANGE_VISIBILITY_LOADING });
  axios
    .put(
      `${baseUrl}/users/change-visibility?type=${type}`,
      { friendId, userType },
      apiHeader()
    )
    .then((res) => dispatch({ type: CHANGE_VISIBILITY, payload: res.data }))
    .catch((err) => dispatch({ type: CHANGE_VISIBILITY_ERROR, payload: err }));
};

export const resetChangeVisibility = (dispatch) => dispatch({type: CHANGE_VISIBILITY_RESET})

export const getUserRequest = (dispatch) => {
  dispatch({ type: USER_REQUEST_RESET });
  dispatch({ type: USER_REQUEST_LOADING });
  axios
    .get(userRequest, apiHeader())
    .then((res) => dispatch({ type: USER_REQUEST, payload: res.data }))
    .catch((err) => dispatch({ type: USER_REQUEST_ERROR, payload: err }));
};

export const updateProfile = (data, dispatch) => {
  dispatch({ type: UPDATE_USER_RESET });
  dispatch({ type: UPDATE_USER_LOADING });
  axios
    .put(userUrl, data, apiHeader())
    .then((res) => dispatch({ type: UPDATE_USER, payload: res.data }))
    .catch((err) => {
      console.log(err);
      dispatch({ type: UPDATE_USER_ERROR, payload: err });
    });
};
