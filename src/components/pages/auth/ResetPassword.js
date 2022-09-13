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

export default function ResetPassword({ navigation }) {
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
              .sendPasswordResetEmail(values.email)
              .then((res) => {
                console.log("MESSAGE SENT !")
                setError();
                setLoading(false);
                navigation.navigate("ResetMessageSent", {email: values.email});
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
                <View style={{ width: width - width / 4, paddingTop: 9 }}>
                  <Text style={{ color: colors.inputLabelColor, fontSize: 13 }}>
                    Enter email associated with your account and we'll send an
                    email with instructions to reset your password.
                  </Text>
                </View>
                {error ? <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: height / 30,
                  }}
                >
                  <AuthErrorMessage message={error} />
                </View> : <></>}
                <View
                  style={{
                    paddingTop: height / 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <NormalInput
                    name="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    label="Email"
                    errorMessage={errors.email}
                  />

                  <View style={{paddingTop: height/ 10}}>
                  <AuthButton
                    type="confirmation"
                    label="Send confirmation"
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
