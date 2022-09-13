import { Formik } from "formik";
import moment from "moment";
import React, { useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { saveTripLocation } from "../../../../redux/actions/locationHistory/locationHistory.action";
import { ActivityDateType } from "../../../../utility/data/constants";
import { SaveTripValidationSchema } from "../../../../utility/validation/save-trip.vaildation";
import AuthButton from "../../../ui/atoms/button/auth.button";
import SavedTripInput from "../../../ui/atoms/input/savedTripInput";

export default function AddSavedTrip({ route, navigation }) {
const dispatch = useDispatch()
  const { height, width } = Dimensions.get("window");
  const { locationHistoryResponse, saveTripReducer } = useSelector((state) => state);
  const { selectedRange, rangeTimeRange, dateValue, timeRange } = route.params;

  // useEffect(() => {
  //   if (saveTripReducer.loaded) {
  //     if (saveTripReducer.data) {
  //       // setTimeout(() => {
  //         navigation.navigate("TripHistory")
  //       // }, 200);
  //     }
  //   }
  // }, [saveTripReducer]);

  const renderError = () => {
    if (saveTripReducer.loaded) {
      if (saveTripReducer.error) {
        return (
          <Text style={{ color: "red", fontWeight: "bold", fontSize: 15 }}>
            Error occured
          </Text>
        );
      } else {
        return <></>;
      }
    }
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        flex: 1,
        height: height,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 13,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("TripHistory")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="chevron-back-outline" color="white" size={20} />
            <Text style={{ paddingLeft: 15, color: "white", fontSize: 16 }}>
              Save the trip
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("TripHistory")}
        >
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              backgroundColor: "rgba(255,255,255,0.2)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon name="close-outline" size={15} />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View
        style={{
          marginTop: height / 4,
          backgroundColor: "rgba(255,255,255,0.18)",
          borderRadius: 10,
          marginHorizontal: 15,
        }}
      >
        <View style={{ margin: 50 }}>
          <Formik
            initialValues={{ name: "" }}
            validationSchema={SaveTripValidationSchema}
            onSubmit={(values) => {
              if (selectedRange) {
                if (selectedRange?.firstDate === selectedRange?.secondDate) {
                  values.date = `${moment(
                    selectedRange?.firstDate
                  ).toISOString()}-${moment(
                    selectedRange?.secondDate
                  ).toISOString()}`;
                } else {
                  values.date = `${moment(selectedRange?.firstDate)
                    .hour(rangeTimeRange[0])
                    .toISOString()}-${moment(selectedRange?.firstDate)
                    .hour(rangeTimeRange[1])
                    .toISOString()}`;
                }
              } else {
                if (ActivityDateType.ONE_DAY) {
                  const startDate = moment(dateValue[0]).hour(timeRange[0]);
                  const secondDate = moment(dateValue[1]).hour(timeRange[1]);
                  values.date = `${startDate.toISOString()}-${secondDate.toISOString()}`;
                } else {
                  values.date = `${dateValue[0]}-${dateValue[1]}`;
                }
              }
              const idArr = locationHistoryResponse.data.map((dat) => dat.id);
              values.locations = idArr;
              saveTripLocation(values, dispatch);
            }}
          >
            {(props) => {
              const { values, handleSubmit, handleChange, errors } = props;
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SavedTripInput
                    name="Trip name"
                    value={values.name}
                    onChange={handleChange("name")}
                    label=""
                    errorMessage={errors.name}
                  />
                  <View>{renderError()}</View>
                  <View style={{ paddingTop: 20 }}>
                    <TouchableWithoutFeedback onPress={handleSubmit}>
                      <View
                        style={{ backgroundColor: "#813BE3", borderRadius: 25 }}
                      >
                        <Text
                          style={{
                            color: "white",
                            paddingHorizontal: 50,
                            paddingVertical: 10,
                          }}
                        >
                          Save trip
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
      </View>
    </SafeAreaView>
  );
}
