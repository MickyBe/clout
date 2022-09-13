import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Dimensions, SafeAreaView } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import AuthButton from "../../../ui/atoms/button/auth.button";
import NetInfo from "@react-native-community/netinfo";

export default function NoConnetion({navigation}) {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
        paddingLeft: width / 18,
        paddingTop: 20,
      }}
    >
      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{fontSize: 20, color: "white" }}
          >
            No Connection
          </Text>
        </View>
        <View style={{paddingTop: height/5}}>
          <View style={{justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <View><Text style={{color: "#B077FF", fontSize: 40}}>:(</Text></View>
            <View><Text style={{color: "white", fontSize: 20, paddingTop: 30}}>Connection not found!</Text></View>
            <View><Text style={{color: "#D0D0D0", fontSize: 13, paddingTop: 10}}>Please check your internet connection</Text></View>
          </View>
        </View>
        <View style={{paddingTop: height/8}}>
          <View style={{justifyContent: "center", alignItems: "center"}}>
            <AuthButton loading={loading} label="Try again" onClick={() => {
              setLoading(true);
              NetInfo.fetch().then(state => {
                if (state.isConnected) {
                  navigation.goBack();
                }
                setLoading(false);
              });
            }} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
