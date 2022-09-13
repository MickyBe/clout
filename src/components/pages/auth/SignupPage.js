import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import SignupValidationSchema from "../../../utility/validation/signup.validation";
import AuthButton from "../../ui/atoms/button/auth.button";
import BackButton from "../../ui/atoms/button/back.button";
import NormalInput from "../../ui/atoms/input/Input";
import Password from "../../ui/atoms/input/password-input";
import { getUserByUserName } from "../../../redux/actions/user/user.action";
import { useDispatch, useSelector } from "react-redux";
import AuthErrorMessage from "../../ui/atoms/messages/auth-error-messages";
import auth from "@react-native-firebase/auth";

export default function SignupPage({ navigation }) {
  const { colors } = useTheme();
  const formRef = useRef();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [checkBoxError, setCheckBoxError] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const { userByUserNameResponse } = useSelector((state) => state);

  useEffect(() => {
    if (userByUserNameResponse.success) {
      setLoading(true);
      if (userByUserNameResponse.data?.id) {
        setLoading(false);
        setError("User name already registered");
      } else {
        auth()
          .sendSignInLinkToEmail(formRef.current.values.email, {
            url: "https://clout-85361.firebaseapp.com",
            handleCodeInApp: true,
            android: {
              installApp: true,
              packageName: "com.kliqsocial.kliq",
            },
          })
          .then((res) => {
            setLoading(false);
            navigation.navigate("MessageSent", {
              email: formRef.current.values.email,
              password: formRef.current.values.password,
              userName: formRef.current.values.userName,
            });
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
    }
  }, [userByUserNameResponse]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        backgroundColor: colors.backgroundColor,
        paddingLeft: width / 13,
        paddingRight: width / 13,
      }}
    >
      <SafeAreaView>
        <Formik
          initialValues={{
            email: "",
            userName: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupValidationSchema}
          onSubmit={(values) => {
            setError();
            if (!checked) {
              setCheckBoxError(true);
            } else {
              setCheckBoxError(false);
              getUserByUserName(values.userName, dispatch);
            }
          }}
          innerRef={formRef}
        >
          {(props) => {
            const { values, handleSubmit, handleChange, errors, status } =
              props;
            console.log(errors);
            return (
              <View>
                <View
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    paddingTop: 20,
                  }}
                >
                  <BackButton onClick={() => navigation.navigate("Login")} />
                </View>
                <View
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    paddingTop: height / 27,
                  }}
                >
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                  >
                    Create your Account.
                  </Text>
                </View>

                {error ? (
                  <View style={{ paddingTop: 20 }}>
                    <AuthErrorMessage message={error} />
                  </View>
                ) : (
                  <></>
                )}

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
                    required={true}
                  />
                  <NormalInput
                    name="userName"
                    value={values.userName}
                    onChange={handleChange("userName")}
                    label="User name"
                    errorMessage={errors.userName}
                    required={true}
                  />

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

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <CheckBox
                        size={18}
                        checked={checked}
                        onPress={() => {
                          if (checked) {
                            setCheckBoxError(true);
                            setChecked(!checked);
                          } else {
                            setCheckBoxError(false);
                            setChecked(!checked);
                          }
                        }}
                      />
                    </View>

                    <View>
                      <Text style={{ fontSize: 11, color: "white" }}>
                        I have read and accept the{" "}
                        <Text style={{ color: colors.secondaryTextColor }}>
                          TERMS AND CONDITIONS
                        </Text>
                      </Text>
                      {checkBoxError ? (
                        <Text style={{ color: "red" }}>
                          Please check terms and conditions
                        </Text>
                      ) : null}
                    </View>
                  </View>

                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <AuthButton
                      loading={loading || userByUserNameResponse.loading}
                      label="Get started"
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
