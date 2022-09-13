import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { ScrollView, View, Text, SafeAreaView } from "react-native";
import SecondaryButton from "../../ui/atoms/button/secondary.button";
import { Dimensions } from "react-native";
import BackButton from "../../ui/atoms/button/back.button";
import Icon from "react-native-vector-icons/FontAwesome";

export default function RecoveryPage({ navigation }) {
  const { colors } = useTheme();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [loading, setLoading] = useState(false);

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 3);
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        backgroundColor: colors.backgroundColor,
        paddingLeft: width / 18,
        paddingTop: 20,
      }}
    >
      <SafeAreaView>
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <BackButton onClick={() => navigation.navigate("Login")} />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              paddingTop: height / 10,
            }}
          >
            <Icon name="envelope" color="white" size={70} />
          </View>
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "white",
                paddingTop: height / 20,
              }}
            >
              Password recovery email sent
            </Text>
          </View>
          <View style={{ width: width - width / 4, paddingTop: 9 }}>
            <Text style={{ color: colors.inputLabelColor, fontSize: 13 }}>
              We just sent you an email with a link to reset your password. If
              you do not receive the email in the next 5 minutes, select the
              button below.
            </Text>
          </View>
          <View
            style={{
              paddingTop: height / 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SecondaryButton
              label="Resend email"
              loading={loading}
              onClick={() => setLoading(true)}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
