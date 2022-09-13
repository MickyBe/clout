import { combineReducers } from "redux";
import LoginReducer from "./login.reducer";
import SignupReducer from "./signup.reducer";
import FriendsReducer from "./friends.reducer";
import {locationAccuracyReducer, userLocationReducer} from "./locationAccuracy.reducer";
import {
  userReducer,
  getAllUserReducer,
  searchUserReducer,
  processRequestReducer,
  changeVisibilityReducer,
  userRequestReducer,
  userProfileReducer,
  updateUserReducer,
  userByUserNameReducer,
} from "./user.reducer";
import {
  addGroupReducer,
  processGroupReducer,
  removeMemberReducer,
  addMemberReducer,
  removeGroupReducer,
  changeGroupVisibilityReducer,
  updateGroupReducer,
} from "./group.reducer";
import {
  addAnnouncementReducer,
  getAnnouncementsReducer,
} from "./announcement.reducer";
import {getLocationHistoryReducer, saveTripsReducer,getSaveTripReducer, deleteSavedTripReducer} from "./locationHistory.reducer";

export default combineReducers({
  login: LoginReducer,
  signupResponse: SignupReducer,
  friends: FriendsReducer,
  locationAccuracy: locationAccuracyReducer,
  user: userReducer,
  users: getAllUserReducer,
  searchResult: searchUserReducer,
  process: processRequestReducer,
  change: changeVisibilityReducer,
  request: userRequestReducer,
  addGroup: addGroupReducer,
  groupRequestProcess: processGroupReducer,
  changeGroupVisibility:changeGroupVisibilityReducer,
  profile: userProfileReducer,
  updateUserResponse: updateUserReducer,
  addAnnouncementResponse: addAnnouncementReducer,
  announcement: getAnnouncementsReducer,
  removeMemberResponse: removeMemberReducer,
  addMembersResponse: addMemberReducer,
  removeGroupResponse: removeGroupReducer,
  locationHistoryResponse: getLocationHistoryReducer,
  saveTripReducer: saveTripsReducer,
  tripsResponse: getSaveTripReducer,
  updateGroupResponse: updateGroupReducer,
  userByUserNameResponse: userByUserNameReducer,
  deleteUserResponse: deleteSavedTripReducer
});
