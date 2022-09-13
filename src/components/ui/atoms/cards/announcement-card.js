import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function AnnouncementCard({ type, data }) {
  if (type === "open") {
    return (
      <View
        style={{
          backgroundColor: "rgba(153, 41, 142,0.5)",
          padding: 10,
          width: "100%",
          borderRadius: 8,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}> {data.creator}</Text>

          {/* <Text style={{ color: "white" }}>🍗 omg chicken wings</Text> */}
        </View>
        <View style={{ paddingVertical: 10, width: "60%" }}>
          <Text style={{ fontSize: 12 }}>
            {data.description}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "rgba(69, 9, 66, 0.5)",
              padding: 12,
              borderRadius: 5,
            }}
          >
            <View style={{ backgroundColor: "gray" }}>
              <Icon
                style={{ padding: 5 }}
                color="white"
                name="return-up-forward-outline"
              />
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ color: "white" }}>NAVIGATE</Text>
            </View>
          </View>
          <View>
            <Text style={{ color: "white" }}>02:40</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          backgroundColor: "rgba(128,128,128, 0.5)",
          padding: 10,
          width: "100%",
          borderRadius: 8,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}> Benjamon</Text>

          <Text style={{ color: "white" }}>🍗 omg chicken wings</Text>
        </View>
        <View style={{ paddingVertical: 10, width: "60%" }}>
          <Text style={{ fontSize: 12 }}>
            There is a bar fight in ricky's bar if anyone is intersted lmao
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "rgba(56,56,56, 0.5)",
              padding: 12,
              borderRadius: 5,
            }}
          >
            <View style={{ backgroundColor: "gray" }}>
              <Icon
                style={{ padding: 5 }}
                color="white"
                name="return-up-forward-outline"
              />
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ color: "white" }}>NAVIGATE</Text>
            </View>
          </View>
          <View>
            <Text style={{ color: "white" }}>02:40</Text>
          </View>
        </View>
      </View>
    );
  }
}

{
  /* <View
      style={{
        ...style,
        backgroundColor: "rgba(153, 41, 142,0.5)",
        padding: 10,
        flexDirection: "row",
        width: "100%",
        borderRadius: 8,
      }}
    >
      <View>
        <View>
          <Text style={{ fontSize: 18, color: "white" }}>Benjamin</Text>
        </View>
        <View style={{ paddingVertical: 10 }}>
          <Text>
            There is a bar fight in ricky's bar if anyone is intersted lmao
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "rgba(69, 9, 66, 0.5)",
            padding: 10,
          }}
        >
          <View style={{ backgroundColor: "gray" }}>
            <Icon
              style={{ padding: 5 }}
              color="white"
              name="return-up-forward-outline"
            />
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ color: "white" }}>NAVIGATE</Text>
          </View>
        </View>
      </View>
    </View> */
}
