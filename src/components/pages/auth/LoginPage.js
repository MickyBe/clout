import { useTheme } from "@react-navigation/native";
import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "react-native-google-signin";
import { useDispatch, useSelector } from "react-redux";
import { userUrl } from "../../../config/url/api.url";
// import GoogleSigninButton from "../../ui/atoms/button/google-signin.button";
import {
  login,
  loginReset,
} from "../../../redux/actions/auth/login/login.action";
import { apiKeyHeader } from "../../../utility/api/headerConf";
import LoginValidationSchema from "../../../utility/validation/login.validation";
import AuthButton from "../../ui/atoms/button/auth.button";
import Logo from "../../ui/atoms/image/logo";
import NormalInput from "../../ui/atoms/input/Input";
import Password from "../../ui/atoms/input/password-input";
import AuthErrorMessage from "../../ui/atoms/messages/auth-error-messages";
import auth from "@react-native-firebase/auth";
import Spinner from "../main/activity/spinner";

export default function LoginPage({ navigation }) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const { colors } = useTheme();
  const dispatch = useDispatch();
  // const [googleLoading, setGoogleLogin] = useState(false);
  const login_res = useSelector((state) => state.login);
  console.log(login_res);
  const nav = () => {
    navigation.navigate("Signup");
    loginReset(dispatch);
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["profile", "email"],
      webClientId:
        "1018329247380-cfsso195p7u7sm104ot2c73odos31tdp.apps.googleusercontent.com",
      offlineAccess: false,
    });
  }, []);

  const onGoogleButtonPress = async () => {
    setLoading(true);
    setError(null);
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken, user } = await GoogleSignin.signIn();
      const userByEmail = await axios.get(
        `${userUrl}/email/${user?.email}`,
        apiKeyHeader()
      );
      if (userByEmail?.data?.id) {
        setError();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
      } else {
        setError("User not found")
        await GoogleSignin.signOut();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setError("Cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError("Play store services not available");
      } else {
        setError("Error message");
      }
      setLoading(false);
    }
  };

  const test = () => {
    console.log("TEST CLICKED >>>> ");
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        backgroundColor: colors.backgroundColor,
        paddingLeft: width / 10,
        paddingRight: width / 10,
        paddingTop: height / 7,
      }}
    >
      <SafeAreaView>
        <Formik
          initialValues={{ userName: "", password: "" }}
          validationSchema={LoginValidationSchema}
          onSubmit={(values) => login(values, dispatch)}
        >
          {(props) => {
            const { values, handleSubmit, handleChange, errors } = props;
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Logo />
                <View
                  style={{
                    paddingBottom: height / 30,
                    paddingTop: height / 35,
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                  >
                    Log in to your account
                  </Text>
                </View>
                {login_res.error ? (
                  <AuthErrorMessage message="Wrong username or password. Please try again." />
                ) : null}
                {error ? <AuthErrorMessage message={error} /> : <></>}

                <NormalInput
                  name="userName"
                  value={values.userName}
                  onChange={handleChange("userName")}
                  label="Email"
                  errorMessage={errors.userName}
                />
                <Password
                  label="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange("password")}
                  errorMessage={errors.password}
                />
                <Text
                  onPress={() => navigation.navigate("ResetPassword")}
                  style={{ color: colors.inputLabelColor }}
                >
                  Forgot password
                </Text>
                <AuthButton
                  loading={login_res.loading}
                  label="login"
                  onClick={handleSubmit}
                />
                <View style={{ paddingTop: height / 40 }}>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <GoogleSigninButton
                      // loading={false}
                      style={{ width: 192, height: 48 }}
                      size={GoogleSigninButton.Size.Wide}
                      color={GoogleSigninButton.Color.Dark}
                      onPress={onGoogleButtonPress}
                    />
                  )}
                </View>
                <Text
                  style={{
                    color: colors.inputLabelColor,
                    paddingTop: height / 30,
                  }}
                >
                  I don 't have an account.
                  <Text
                    onPress={nav}
                    style={{ color: colors.secondaryTextColor }}
                  >
                    Signup
                  </Text>
                </Text>
              </View>
            );
          }}
        </Formik>
      </SafeAreaView>
    </ScrollView>
  );
}
