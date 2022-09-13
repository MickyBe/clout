import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { ScrollView, View, Text, SafeAreaView } from "react-native";
import NormalInput from "../../ui/atoms/input/Input";
import AuthButton from "../../ui/atoms/button/auth.button";
import { Formik } from "formik";
import ResetValidationSchema from "../../../utility/validation/reset.validation";
import { Dimensions } from "react-native";
import BackButton from "../../ui/atoms/button/back.button";
import auth from "@react-native-firebase/auth";
import AuthErrorMessage from "../../ui/atoms/messages/auth-error-messages";
import Password from "../../ui/atoms/input/password-input";

export default function ResetPasswordPage({ navigation }) {
  const [error, setError] = useState();
  const { colors } = useTheme();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
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
      <SafeAreaView>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={ResetValidationSchema}
          onSubmit={(values) => {
            console.log("Values >>> ", values);
            setLoading(true);
            auth()
              .sendPasswordResetEmail(values.email, {
                url: "https://clout-85361.firebaseapp.com",
                handleCodeInApp: true,
                android: {
                  installApp: true,
                  packageName: "com.kliqsocial.kliq",
                },
              })
              .then((res) => {
                console.log("MESSAGE SENT !");
                setError();
                setLoading(false);
                navigation.navigate("ResetMessageSent", {
                  email: values.email,
                });
              })
              .catch((err) => {
                console.log(err);
                setError(err.message);
                setLoading(false);
              });
          }}
        >
          {(props) => {
            const { values, handleSubmit, handleChange, errors } = props;
            return (
              <View>
                <View
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <BackButton onClick={() => navigation.navigate("Login")} />
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "white",
                      paddingTop: height / 10,
                    }}
                  >
                    Reset Password.
                  </Text>
                </View>
                {error ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingTop: height / 30,
                    }}
                  >
                    <AuthErrorMessage message={error} />
                  </View>
                ) : (
                  <></>
                )}
                <View
                  style={{
                    paddingTop: height / 7,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Password
                    label="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange("password")}
                    errorMessage={errors.password}
                    required={true}
                  />
                  <Password
                    label="Confirm your password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    errorMessage={errors.confirmPassword}
                    required={true}
                  />

                  <View style={{paddingTop: height / 10}}>
                  <AuthButton
                    label="Reset"
                    loading={loading}
                    onClick={handleSubmit}
                  />
                  </View>
                </View>
              </View>
            );
          }}
        </Formik>
      </SafeAreaView>
    </ScrollView>
  );
}
