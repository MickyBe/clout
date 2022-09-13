import React, { Component } from "react";
import {
  StyleSheet,
  Linking,
  Dimensions,
  SafeAreaView,
  View,
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import Icon from "react-native-vector-icons/Ionicons";

class ScanScreen extends Component {
  onSuccess(e) {
    console.log(e);
  }

  render() {
    const { height, width } = Dimensions.get("window");
    return (
      <SafeAreaView>
        <View style={{ position: "absolute", top: 10, right: 10 }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 20 / 2,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
            }}
          >
            <Icon name="close-outline" />
          </View>
        </View>
        <QRCodeScanner
          cameraStyle={{ height: height, width: width }}
          showMarker
          markerStyle={{
            borderRadius: 8,
            borderColor: "white",
            borderWidth: 10,
          }}
          onRead={this.onSuccess.bind(this)}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default ScanScreen;
