import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  LayoutAnimation,
  ScrollView,
  UIManager,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  processGroupRequest,
  resetProcessGroupRequest,
} from "../../../../redux/actions/group/group.action";
import {
  processRequest,
  getUserRequest,
  resetProcessRequest,
} from "../../../../redux/actions/user/user.action";
import {
  GroupRequestProcessType,
  RequestProcessType,
} from "../../../../utility/data/constants";
import AccordionHeader from "../../../ui/atoms/extras/accordion-header";
import NotificationTopbar from "../../../ui/atoms/notification/notification-topbar";
import FriendRequestCard from "../../../ui/atoms/user/friend-request-card";
import GroupRequestCard from "../../../ui/atoms/user/group-request-card";
import { socket } from "../../../../service/socket";
import AnnouncementCard from "../../../ui/atoms/cards/announcement-card";
import auth from "@react-native-firebase/auth";

export default function Notification() {
  const userAuth = auth().currentUser;
  const width = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const [openRequest, setOpenRequest] = useState(true);
  const [openAnnouncement, setOpenAnnouncement] = useState(true);
  const [annoucementData, setAnnouncementData] = useState([]);
  const userRequests = useSelector((state) => state.request);
  const processRequestResponse = useSelector((state) => state.process);
  const processGroupRequestResponse = useSelector(
    (state) => state.groupRequestProcess
  );

  // useEffect(() => {
  //   getUserRequest(dispatch);
  // }, [processRequestResponse, processGroupRequestResponse]);

  if (processRequestResponse.data) {
    resetProcessRequest(dispatch);
    getUserRequest(dispatch);
  }

  if (processGroupRequestResponse.data) {
    resetProcessGroupRequest(dispatch);
    getUserRequest(dispatch);
  }

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  useEffect(() => {
    socket.on(`announcement-${userAuth.uid}`, (msg) => {
      const data = JSON.parse(msg.message);
      let temp = annoucementData;
      temp.push(data);
      setAnnouncementData([...temp]);
    });
  }, []);

  console.log("announcement data >>> ", annoucementData);

  return (
    <View
      key={Date.now()}
      style={{
        backgroundColor: "rgba(0,0,0,0.8)",
        height: "100%",
      }}
    >
      <View
        style={{
          borderBottomColor: "gray",
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}
      >
        <NotificationTopbar
          count={
            userRequests.data.id ? userRequests.data.userFriends.length : 0
          }
        />
      </View>

      {userRequests.loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={50} />
        </View>
      ) : (
        <ScrollView
          style={{
            height: "100%",
            width: width,
            alignSelf: "center",
            paddingHorizontal: 15,
          }}
        >
          <AccordionHeader
            title="Requests"
            count={
              userRequests.data.id ? userRequests.data.userFriends.length : 0
            }
            open={openRequest}
            handleAccordion={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              setOpenRequest(!openRequest);
            }}
            style={{ paddingTop: 10, paddingHorizontal: 10 }}
          />
          {userRequests.data.id && openRequest ? (
            <View>
              {userRequests.data.groups.length > 0
                ? userRequests.data.groups.map((group, index) => (
                    <GroupRequestCard
                      group={group}
                      key={index}
                      rejectGroupRequest={() =>
                        processGroupRequest(
                          GroupRequestProcessType.REJECT_GROUP_REQUEST,
                          group.id,
                          dispatch
                        )
                      }
                      acceptGroupRequest={() =>
                        processGroupRequest(
                          GroupRequestProcessType.ACCEPT_GROUP_REQUEST,
                          group.id,
                          dispatch
                        )
                      }
                      loading={processGroupRequestResponse.loading}
                    />
                  ))
                : null}
              {userRequests.data.userFriends.length > 0
                ? userRequests.data.userFriends.map((item, index) => {
                    return (
                      <FriendRequestCard
                        key={index}
                        acceptRequest={() => {
                          processRequest(
                            RequestProcessType.ACCEPT_REQUEST,
                            item.id,
                            dispatch
                          );
                          // getUserRequest(dispatch);
                        }}
                        rejectRequest={() => {
                          processRequest(
                            RequestProcessType.REJECT_REQUEST,
                            item.id,
                            dispatch
                          );
                          // getUserRequest(dispatch);
                        }}
                        data={item}
                        acceptLoading={processRequestResponse.loading}
                      />
                    );
                  })
                : null}
            </View>
          ) : null}

          <AccordionHeader
            title="Announcements"
            count={annoucementData.length}
            open={openAnnouncement}
            handleAccordion={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              setOpenAnnouncement(!openAnnouncement);
            }}
            style={{ paddingVertical: 10, paddingHorizontal: 10 }}
          />

          {annoucementData.length > 0 ? (
            annoucementData.map((announcement) => {
              return (
                <View style={{ paddingTop: 10 }}>
                  <AnnouncementCard type="open" data={announcement} />
                </View>
              );
            })
          ) : (
            <></>
          )}

          {/* {openAnnouncement ? (
            <View>
              <View style={{ paddingTop: 10 }}>
                <AnnouncementCard type="open" />
              </View>
              <View style={{ paddingTop: 10 }}>
                <AnnouncementCard />
              </View>
              <View style={{ paddingTop: 10 }}>
                <AnnouncementCard type="open" />
              </View>
              <View style={{ paddingTop: 10 }}>
                <AnnouncementCard />
              </View>
            </View>
          ) : null} */}
        </ScrollView>
      )}
    </View>
  );
}
