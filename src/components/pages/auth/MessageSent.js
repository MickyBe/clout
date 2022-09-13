import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Modal,
} from "react-native";
import SecondaryButton from "../../ui/atoms/button/secondary.button";
import { Dimensions } from "react-native";
import BackButton from "../../ui/atoms/button/back.button";
import Icon from "react-native-vector-icons/FontAwesome";
import auth from "@react-native-firebase/auth";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import {
  signup,
  signupReset,
} from "../../../redux/actions/auth/signup/signup.action";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userUrl } from "../../../config/url/api.url";

export default function MessageSent({ navigation, route }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { userName, email, password } = route.params;
  const { signupResponse } = useSelector((state) => state);

  console.log("SIGNUP RESPONSE >>>> ", signupResponse);

  useEffect(() => {
    const handleDynamicLink = async (link) => {
      if (auth().isSignInWithEmailLink(link.url)) {
        setLoading(true);
        signup(email, password, userName);
      }
    };

    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    dynamicLinks()
      .getInitialLink()
      .then((link) => link && handleDynamicLink(link));
    return () => unsubscribe();
  }, []);

  const signup = (email, password, userName) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        auth()
          .currentUser.updateProfile({ displayName: userName })
          .then(() => console.log("YAAYS"))
          .catch((err) => console.log(err));
        axios
          .post(
            userUrl,
            {
              username: userName,
              uid: cred.user.uid,
              email: cred.user.email,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cred.user.uid}`,
              },
            }
          )
          .then((res) => {
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log("ERROR >>>> ", err);
          });
      })
      .then((err) => {
        setLoading(false);
        console.log("ERROR >>>> ", err);
      });
  };

  const resendEmail = () => {
    setResendLoading(true);
    auth()
      .sendSignInLinkToEmail(email, {
        url: "https://clout-85361.firebaseapp.com",
        handleCodeInApp: true,
        android: {
          installApp: true,
          packageName: "com.kliqsocial.kliq",
        },
      })
      .then((res) => {
        setResendLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setResendLoading(false);
      });
  };

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
              Email verification sent!
            </Text>
          </View>
          <View style={{ width: width - width / 4, paddingTop: 9 }}>
            <Text style={{ color: colors.inputLabelColor, fontSize: 13 }}>
              We sent you a verifcation mail with a link that will activate your
              account. Select the button below if you have not received it in
              the next 5 minutes.
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
              onClick={() => resendEmail()}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
