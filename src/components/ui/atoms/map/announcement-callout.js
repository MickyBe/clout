import React from "react";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-elements";
import NavigateButton from "../button/navigateButton";
import { imageDir } from "../../../../utility/data/constants";
import { isNil } from "lodash";
import AudioPlayer from "../../../pages/main/announcement/audio-player";
export function AnnouncementCallout({ data, width }) {
  console.log("WORDS ");

  return (
    <View
      style={{
        width: width,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          borderRadius: 8,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ fontSize: 10 }}>1:50 am</Text>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
        >
          <View>
            <Avatar
              rounded
              source={{
                uri: imageDir(data?.profileImage),
              }}
              size={50}
            />
            <View style={{ position: "absolute", left: 30, top: 35 }}>
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 20 / 2,
                  backgroundColor: "#E03AE3",
                  justifyContent: "center",
                  alignItems: "center",
                  transform: [{ rotate: "340deg" }],
                }}
              >
                <Icon name="megaphone-outline" color="white" size={15} />
              </View>
            </View>
          </View>
          <View style={{ paddingLeft: 15, paddingTop: 5 }}>
            <Text
              style={{
                color: "#FF9330",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              {data?.creator}
            </Text>
            <Text style={{ fontSize: 13, color: "white" }}>
              {data?.description}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingTop: 15,
            justifyContent: "flex-end",
          }}
        >
          {/* <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 12 }}>🌽</Text>
            <Text style={{ fontSize: 12, paddingLeft: 10 }}>
              Cornlight group
            </Text>
          </View> */}
          <View>
            <NavigateButton />
          </View>
        </View>
      </View>
      {/* <View
        style={{
          width: 10,
          height: 10,
          backgroundColor: "transparent",
          borderStyle: "solid",
          borderLeftWidth: 10,
          borderRightWidth: 10,
          borderBottomWidth: 20,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: "rgba(0,0,0,0.7)",
          transform: [{ rotate: "180deg" }],
        }}
      /> */}
    </View>
  );
}

export function AnnouncementImageCallout({ data, width }) {
  console.log("IMAGEEE >>");
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >



      <View
        style={{
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      >
        <View>
          <Avatar
            rounded
            source={{
              uri: imageDir(data?.profileImage),
            }}
            size={35}
          />
          <View style={{ position: "absolute", left: 20, top: 25 }}>
            <View
              style={{
                height: 15,
                width: 15,
                borderRadius: 15 / 2,
                backgroundColor: "#E03AE3",
                justifyContent: "center",
                alignItems: "center",
                transform: [{ rotate: "340deg" }],
              }}
            >
              <Icon name="megaphone-outline" color="white" size={12} />
            </View>
          </View>
        </View>
        <View style={{ paddingLeft: 15, paddingTop: 5 }}>
          <Text
            style={{
              color: "#FF9330",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            {data?.name}
          </Text>
        </View>
      </View>



      {data?.image ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 15,
          }}
        >
          <Image
            source={{
              uri: imageDir(data?.image),
              width: 200,
              height: 200,
            }}
            style={{ borderWidth: 2, borderColor: "gray" }}
          />
        </View>
      ) : (
        <></>
      )}



      {data?.audio ? (
        <View style={{ paddingTop: 10 }}>
          <AudioPlayer audio={imageDir(data?.audio)} />
        </View>
      ) : (
        <></>
      )}



      <View style={{ flexDirection: "row", paddingTop: 15 }}>
        <Text style={{ fontSize: 13 }}>{data?.description}</Text>
        <View style={{ paddingLeft: 5 }}>
          <NavigateButton />
        </View>
      </View>


    </View>
  );
}


export function AnnouncementAudioCallout({ data, width }) {
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >



      <View
        style={{
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      >
        <View>
          <Avatar
            rounded
            source={{
              uri: imageDir(data?.profileImage),
            }}
            size={35}
          />
          <View style={{ position: "absolute", left: 20, top: 25 }}>
            <View
              style={{
                height: 15,
                width: 15,
                borderRadius: 15 / 2,
                backgroundColor: "#E03AE3",
                justifyContent: "center",
                alignItems: "center",
                transform: [{ rotate: "340deg" }],
              }}
            >
              <Icon name="megaphone-outline" color="white" size={12} />
            </View>
          </View>
        </View>
        <View style={{ paddingLeft: 15, paddingTop: 5 }}>
          <Text
            style={{
              color: "#FF9330",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            {data?.name}
          </Text>
        </View>
      </View>



      {data?.audio ? (
        <View style={{ paddingTop: 10 }}>
          <AudioPlayer audio={imageDir(data?.audio)} />
        </View>
      ) : (
        <></>
      )}



      <View style={{ flexDirection: "row", paddingTop: 15 }}>
        <Text style={{ fontSize: 13 }}>{data?.description}</Text>
        <View style={{ paddingLeft: 5 }}>
          <NavigateButton />
        </View>
      </View>


    </View>
  );
}
