import {
  ADD_ANNOUNCEMENT,
  ADD_ANNOUNCEMENT_ERROR,
  ADD_ANNOUNCEMENT_LOADING,
  ADD_ANNOUNCEMENT_RESET,
  GET_ANNOUNCEMENTS,
  GET_ANNOUNCEMENTS_ERROR,
  GET_ANNOUNCEMENTS_LOADING,
  GET_ANNOUNCEMENTS_RESET,
} from "./announcement.type";
import axios from "axios";
import { apiHeader } from "../../../utility/api/headerConf";
import { addAnnouncementUrl, getAnnouncementUrl } from "../../../config/url/api.url";

export const addAnnouncement = (data, dispatch) => {
  dispatch({ type: ADD_ANNOUNCEMENT_RESET });
  dispatch({ type: ADD_ANNOUNCEMENT_LOADING });
  axios
    .post(addAnnouncementUrl, data, apiHeader())
    .then((res) => dispatch({ type: ADD_ANNOUNCEMENT, payload: res.data }))
    .catch((err) => dispatch({ type: ADD_ANNOUNCEMENT_ERROR, payload: err.message }));
};

export const addAnnouncementReset = (dispatch) => dispatch({type: ADD_ANNOUNCEMENT_RESET})

export const getAnnouncements = (dispatch) => {
  dispatch({ type: GET_ANNOUNCEMENTS_RESET });
  dispatch({ type: GET_ANNOUNCEMENTS_LOADING });
  axios
    .get(getAnnouncementUrl, apiHeader())
    .then((res) => dispatch({ type: GET_ANNOUNCEMENTS, payload: res.data }))
    .catch((err) => dispatch({ type: GET_ANNOUNCEMENTS_ERROR, payload: err }));
};
