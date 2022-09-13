import React from "react";
import DateRangePicker from "react-native-daterange-picker";
import {
    Dimensions,
    Modal,
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    View,
    ActivityIndicator,
    Alert,
  } from "react-native";

export default function CalendarModal() {
    const { height, width } = Dimensions.get("window");
    return <Modal
    animationType="slide"
    transparent={true}
    visible={show}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      setShow(!show);
    }}
  >
    <View
      style={{ flex: 1, paddingTop: height / 5.5, paddingHorizontal: 30 }}
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 3,
        }}
      >
        <DateRangePicker
          style={{ backgroundColor: "black" }}
          onChange={(range) => {
            setDateValue([
              moment(range.firstDate).startOf("date").toDate(),
              moment(range.secondDate).endOf("date").toDate(),
            ]);
          }}
          endDate={moment()}
          startDate={moment().subtract(100, "days")}
        />
        <Button
          title="OK"
          containerStyle={{ backgroundColor: "#D764FF" }}
          onPress={() => setShow(false)}
        />
      </View>
    </View>
  </Modal>
}