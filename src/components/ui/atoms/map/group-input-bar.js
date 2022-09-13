import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
  Dimensions,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import EmojiSelector from "react-native-emoji-selector";

export default function GroupInputBar({ onGroupNameChange, groupName, emoji, setEmoji }) {
  const { colors } = useTheme();
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  
  const height = Dimensions.get("window").height;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        paddingTop: 15,
        paddingBottom: 0,
        width: "100%",
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <TextInput
          style={{
            // flex:1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            backgroundColor: "rgba(128,128,128, 0.5)",
            paddingLeft: 20,
            width: "100%",
          }}
          selectionColor={colors.inputLabelColor}
          value={groupName}
          inputStyle={{
            backgroundColor: "rgba(128,128,128, 0.5)",
            width: "100%",
            paddingLeft: 10,
            color: colors.inputLabelColor,
          }}
          inputContainerStyle={{
            borderBottomWidth: 0,
            Color: "rgba(128,128,128, 0.5)",
          }}
          placeholder="Name Your Group Something Funny"
          placeholderTextColor="gray"
          keyboardType="web-search"
          onChangeText={(text) => onGroupNameChange(text)}
        />
      </View>

      <TouchableWithoutFeedback
        style={{
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
        }}
        onPress={() => setIsEmojiOpen(!isEmojiOpen)}
        underlayColor="transparent"
      >
        <View
          style={{
            backgroundColor: "rgba(10,10,10, 0.5)",
            flexDirection: "row",
            padding: 10,
            // width: 40,
            height: "100%",
            borderRadius: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>{emoji}</Text>
          <Icon name="chevron-down-outline" size={30} color="white" />
        </View>
      </TouchableWithoutFeedback>
      <Modal animationType="slide" transparent={true} visible={isEmojiOpen}>
        <View style={{ padding: 15, borderRadius: 50, paddingTop: 200 }}>
          <View style={{ height: height / 1, backgroundColor: "#2b2b2b" }}>
            <EmojiSelector
              showSearchBar={false}
              showHistory={false}
              showTabs={false}
              onEmojiSelected={(emoji) => {
                setEmoji(emoji);
                setIsEmojiOpen(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
