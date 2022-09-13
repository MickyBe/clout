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
} from "./group.type";
import axios from "axios";
import { apiHeader } from "../../../utility/api/headerConf";
import { baseUrl, addGroup } from "../../../config/url/api.url";

export const addGroupAction = (data, dispatch) => {
  dispatch({ type: ADD_GROUP_RESET });
  dispatch({ type: ADD_GROUP_LOADING });
  axios
    .post(addGroup, data, apiHeader())
    .then((res) => dispatch({ type: ADD_GROUP, payload: res.data }))
    .catch((err) => dispatch({ type: ADD_GROUP_ERROR, payload: err }));
};

export const processGroupRequest = (type, groupId, dispatch) => {
  dispatch({ type: PROCESS_GROUP_REQUEST_RESET });
  dispatch({ type: PROCESS_GROUP_REQUEST_LOADING });
  axios
    .put(
      `${baseUrl}/users/process-group-request?type=${type}`,
      { groupId },
      apiHeader()
    )
    .then((res) => dispatch({ type: PROCESS_GROUP_REQUEST, payload: res.data }))
    .catch((err) =>
      dispatch({ type: PROCESS_GROUP_REQUEST_ERROR, payload: err })
    );
};

export const resetProcessGroupRequest = (dispatch) =>
  dispatch({ type: PROCESS_GROUP_REQUEST_RESET });

export const changeGroupVisibility = (type, ownerId, groupId, dispatch) => {
    dispatch({ type: CHANGE_GROUP_VISIBILITY_RESET });
    dispatch({ type: CHANGE_GROUP_VISIBILITY_LOADING });
    axios
      .put(
        `${baseUrl}/groups/change-visibility?type=${type}`,
        { ownerId, groupId },
        apiHeader()
      )
      .then((res) => dispatch({ type: CHANGE_GROUP_VISIBILITY, payload: res.data }))
      .catch((err) => dispatch({ type: CHANGE_GROUP_VISIBILITY_ERROR, payload: err }));
  };
  
export const resetChangeGroupVisibility = (dispatch) => dispatch({type: CHANGE_GROUP_VISIBILITY_RESET})

export const RemoveFriendFromGroup = (groupId, memberId, dispatch) => {
  dispatch({ type: REMOVE_FRIEND_RESET });
  dispatch({ type: REMOVE_FRIEND_LOADING });
  axios
    .put(`${baseUrl}/groups/${groupId}`, { memberId }, apiHeader())
    .then((res) => dispatch({ type: REMOVE_FRIEND, payload: res.data }))
    .catch((err) => dispatch({ type: REMOVE_FRIEND_ERROR, payload: err }));
};

export const resetRemoveFriendFromGroup = (dispatch) =>
  dispatch({ type: REMOVE_FRIEND_RESET });

export const AddMembers = (groupId, memberId, dispatch) => {
  dispatch({ type: ADD_MEMBERS_RESET });
  dispatch({ type: ADD_MEMBERS_LOADING });
  axios
    .put(`${baseUrl}/groups/add-members/${groupId}`, { memberId }, apiHeader())
    .then((res) => dispatch({ type: ADD_MEMBERS, payload: res.data }))
    .catch((err) => dispatch({ type: ADD_MEMBERS_ERROR, payload: err }));
};

export const resetAddMemebers = (dispatch) =>
  dispatch({ type: DELETE_GROUP_RESET });

export const deleteGroup = (groupId, dispatch) => {
  dispatch({ type: DELETE_GROUP_RESET });
  dispatch({ type: DELETE_GROUP_LOADING });
  axios
    .delete(`${baseUrl}/groups/${groupId}`, apiHeader())
    .then((res) => dispatch({ type: DELETE_GROUP, payload: res.data }))
    .catch((err) => dispatch({ type: DELETE_GROUP_ERROR, payload: err }));
};

export const resetDeleteMemeber = (dispatch) =>
  dispatch({ type: DELETE_GROUP_RESET });




  export const updateGroup = (groupId, data, dispatch) => {
    console.log("Group data >>> ", {id:groupId, name: data.name, emoji: data.emoji});
    dispatch({ type: UPDATE_GROUP_RESET });
    dispatch({ type: UPDATE_GROUP_LOADING });
    axios
      .put(`${baseUrl}/groups/update/${groupId}`, data, apiHeader())
      .then((res) => dispatch({ type: UPDATE_GROUP, payload: res.data }))
      .catch((err) => dispatch({ type: UPDATE_GROUP_ERROR, payload: err }));
  };
  
  export const resetUpdateGroup = (dispatch) =>
    dispatch({ type: UPDATE_GROUP_RESET });
