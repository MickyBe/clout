import { useTheme } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FriendTopBar from "../../../../ui/atoms/map/friends-search-topbar";
import PeopleYouMayKnow from "../../../../ui/atoms/user/user-may-know-card";
import {
  getAllUsers,
  processRequest,
} from "../../../../../redux/actions/user/user.action";
import { searchFriends } from "../../../../../redux/actions/user/user.action";
import { RequestProcessType } from "../../../../../utility/data/constants";
import UserCard from "../../../../ui/atoms/user/friends-search-result-card";

export default function FriendsSearch(props) {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const searchResult = useSelector((state) => state.searchResult);
  const sendRequestResponse = useSelector((state) => state.process);

  useEffect(() => {
    getAllUsers(dispatch);
  }, [sendRequestResponse]);

  console.log(sendRequestResponse);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{
        backgroundColor: "rgba(0,0,0,0.9)",
        width: "100%",
        height: "100%",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <FriendTopBar
          handleBack={() => props.navigation.goBack()}
          onClick={() => props.onClose()}
          onSearchFriends={(value) => {
            if (value.length > 2) {
              searchFriends(value.toLowerCase(), dispatch);
            }
          }}
        />
      </View>
      {loading ? (
        <View
          style={{
            height: height,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={50} color={colors.authButtonColor} />
        </View>
      ) : (
        <View style={{ width: width }}>
          {searchResult.loading ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 35,
                paddingBottom: 35,
              }}
            >
              <ActivityIndicator size={30} color="#813be3" />
            </View>
          ) : searchResult.data ? (
            searchResult.data.length > 0 ? (
              searchResult.data[0].friends.length > 0 ||
              searchResult.data[0].userFriends.length > 0 ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                >
                  {[
                    ...searchResult.data[0].friends,
                    ...searchResult.data[0].userFriends,
                  ].map((user, index) => (
                    <UserCard user={user} type={"visible"} key={index} />
                  ))}
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 40,
                    paddingBottom: 40,
                  }}
                >
                  <Text style={{ fontSize: 15, color: "red" }}>
                    Friends not found
                  </Text>
                </View>
              )
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 40,
                  paddingBottom: 40,
                }}
              >
                <Text style={{ fontSize: 15, color: "red" }}>
                  Friends not found
                </Text>
              </View>
            )
          ) : null}
          {/* {searchResult.data ? (
            searchResult.data.usersFriends ? (
              searchResult.data.usersFriends.length > 0 ? ( */}
          <View
            style={{
              justifyContent: "flex-start",
              paddingLeft: 20,
              paddingTop: 15,
              paddingBottom: 15,
            }}
          >
            <Text style={{ fontSize: 17, color: "white" }}>You May Know</Text>
          </View>
          {/* ) : null
            ) : null
          ) : null} */}

          {users.loading ? (
            <ActivityIndicator color={colors.authButtonColor} size={50} />
          ) : null}

          {users.data ? (
            users.data.length > 0 ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: width,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                {users.data.map((item, index) => (
                  <PeopleYouMayKnow
                    loading={sendRequestResponse.loading}
                    data={item}
                    sendRequest={() =>
                      processRequest(
                        RequestProcessType.SEND_REQUEST,
                        item.id,
                        dispatch
                      )
                    }
                  />
                ))}
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 40,
                  paddingBottom: 40,
                }}
              >
                <Text style={{ fontSize: 15, color: "red" }}>Empty</Text>
              </View>
            )
          ) : null}
        </View>
      )}
    </ScrollView>
  );
}
