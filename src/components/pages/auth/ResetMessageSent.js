import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import AuthButton from "../../ui/atoms/button/auth.button";
import BackButton from "../../ui/atoms/button/back.button";
import SecondaryButton from "../../ui/atoms/button/secondary.button";
import auth from "@react-native-firebase/auth";

export default function ResetMessageSent({ navigation, route }) {
  const { email } = route.params;
  const { colors } = useTheme();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const { signupResponse } = useSelector((state) => state);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        backgroundColor: colors.backgroundColor,
        paddingLeft: width / 18,
        paddingTop: 20,
      }}
    >
      <Modal
        animationType="none"
        transparent={true}
        visible={signupResponse.loading}
        backgroundColor={colors.primary}
      >
        <View
          style={{
            flex: 1,
            paddingTop: height / 3,
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <ActivityIndicator size={90} color="#D764FF" />
        </View>
      </Modal>
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
              Password recovery email sent!
            </Text>
          </View>
          <View style={{ width: width - width / 4, paddingTop: 9 }}>
            <Text style={{ color: colors.inputLabelColor, fontSize: 13 }}>
              We just sent you an email with a link to reset your password. If
              you did not receive the email in the next 5 minutes, select the
              button below.
            </Text>
          </View>
          <View
            style={{
              paddingTop: height / 10,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SecondaryButton
              label="Resend email"
              loading={loading}
              onClick={() => {
                setLoading(true);
                auth()
                  .sendPasswordResetEmail(email)
                  .then((res) => {
                    setError();
                    setLoading(false);
                  })
                  .catch((err) => {
                    console.log(err);
                    setError(err.message);
                    setLoading(false);
                  });
              }}
            />
            <View style={{paddingTop: 25}}>
            <AuthButton
              type="Login"
              label="Login"
              onClick={() => navigation.navigate("Login")}
            />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
