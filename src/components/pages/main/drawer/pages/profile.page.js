import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
} from "react-native";
import { Avatar, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserProfile,
  updateProfile,
} from "../../../../../redux/actions/user/user.action";
import { baseUrl } from "../../../../../config/url/api.url";
import { imageDir } from "../../../../../utility/data/constants";
// import path from "path";

export default function ProfilePage({ navigation }) {
  const [img, setImg] = useState();
  const [onEdit, setOnEdit] = useState(false);
  const dispatch = useDispatch();
  const { profile, updateUserResponse } = useSelector((state) => state);

  console.log(profile);

  useEffect(() => {
    if (
      updateUserResponse.data === true &&
      updateUserResponse.loading === false
    ) {
      setOnEdit(false);
      setImg();
      getUserProfile(dispatch);
    }
  }, [updateUserResponse]);

  const [userName, setUserName] = useState();
  const [bio, setBio] = useState();

  const profilePicker = (mediaType = "photo") => {
    ImagePicker.openPicker({
      cropping: true,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
      cropperToolbarColor: "#2b2b2b",
      cropperStatusBarColor: "#2b2b2b",
      cropperToolbarWidgetColor: "#813BE3",
    })
      .then((image) => {
        setImg({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
      })
      .catch((e) => console.log(e));
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
    >
      <View style={{ position: "absolute", top: 15, right: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setImg();
              setOnEdit(!onEdit);
            }}
          >
            <View
              style={{
                height: 30,
                width: 30,
                backgroundColor: "#242424",
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="pencil-outline" size={25} color="white" />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View
              style={{
                height: 30,
                width: 30,
                backgroundColor: "#242424",
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Icon name="close-outline" size={25} color="white" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      {/* BODY OF PAGE BODY OF PAGE BODY OF PAGE BODY OF PAGE BODY OF PAGE */}

      {profile.loading ? (
        <ActivityIndicator size={50} color="#813BE3" />
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View>
            {onEdit ? (
              img ? (
                <TouchableWithoutFeedback onPress={() => profilePicker()}>
                  <Image
                    style={{
                      borderRadius: 80,
                      borderColor: "white",
                    }}
                    resizeMode="cover"
                    source={img}
                    width={160}
                    height={160}
                  />
                </TouchableWithoutFeedback>
              ) : (
                <TouchableWithoutFeedback onPress={() => profilePicker()}>
                  <View
                    style={{
                      height: 160,
                      width: 160,
                      borderRadius: 80,
                      backgroundColor: "white",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon color="gray" size={60} name="cloud-upload-outline" />
                  </View>
                </TouchableWithoutFeedback>
              )
            ) : profile.data ? (
              <Avatar
                rounded
                size={160}
                source={{
                  uri: imageDir(profile?.data?.profileImage),
                }}
                containerStyle={{ borderWidth: 1, borderColor: "white" }}
              />
            ) : (
              <NoImageAvatar />
            )}
          </View>
          <View style={{ paddingTop: 20 }}>
            {onEdit ? (
              <Input
                placeholder="User name"
                selectionColor="red"
                containerStyle={{ width: 200 }}
                labelStyle={{
                  fontSize: 15,
                  color: "#c2c2c2",
                }}
                value={userName ?? profile.data?.username}
                onChangeText={(val) => setUserName(val)}
                inputStyle={{
                  borderRadius: 3,
                  paddingLeft: 0,
                  fontSize: 15,
                  color: "white",
                }}
              />
            ) : profile?.data?.username ? (
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                {profile?.data?.username}
              </Text>
            ) : null}
          </View>
          {onEdit ? (
            <View>
              <Input
                placeholder="Bio"
                containerStyle={{ width: 300 }}
                labelStyle={{
                  fontSize: 15,
                  color: "#c2c2c2",
                }}
                value={bio ?? profile.data?.bio}
                onChangeText={(val) => setBio(val)}
                inputStyle={{
                  borderRadius: 3,
                  paddingLeft: 0,
                  fontSize: 15,
                  color: "white",
                }}
              />
            </View>
          ) : profile?.data?.bio ? (
            <View style={{ paddingTop: 10 }}>
              <Text>{profile?.data?.bio}</Text>
            </View>
          ) : null}
          <View style={{ paddingTop: 30 }}>
            {!onEdit ? (
              <View style={{ backgroundColor: "#242424", borderRadius: 20 }}>
                {profile?.data?.userFriends && profile?.data?.friends ? (
                  <Text
                    style={{
                      color: "white",
                      paddingVertical: 5,
                      paddingHorizontal: 20,
                    }}
                  >
                    {`${
                      [...profile?.data?.userFriends, ...profile?.data?.friends]
                        .length
                    } groups`}
                  </Text>
                ) : (
                  <Text></Text>
                )}
              </View>
            ) : null}
          </View>
        </View>
      )}

      {/* BODY OF PAGE BODY OF PAGE BODY OF PAGE BODY OF PAGE BODY OF PAGE */}

      {onEdit ? (
        <View style={{ position: "absolute", bottom: 15, right: 15 }}>
          {updateUserResponse.loading ? (
            <ActivityIndicator size={40} color="#813BE3" />
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                const formData = new FormData();
                if (img)
                  formData.append("image", {
                    uri: img.uri,
                    type: img.mime,
                    name: img.uri.split("/")[img.uri.split("/").length - 1],
                  });
                if (userName) formData.append("username", userName);
                if (bio) formData.append("bio", bio);

                updateProfile(formData, dispatch);
              }}
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  backgroundColor: "#813BE3",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon name="checkmark-outline" color="white" size={30} />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      ) : null}
    </View>
  );
}

const NoImageAvatar = () => {
  return (
    <View
      style={{
        height: 160,
        width: 160,
        borderRadius: 80,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Icon name="person-outline" size={60} color="black" />
    </View>
  );
};
