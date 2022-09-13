import MapboxGL from "@react-native-mapbox-gl/maps";
import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import {
  Dimensions,
  Modal,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
// import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import DateRangePicker from "rn-select-date-range";
// import DateRangePicker from "react-native-daterange-picker";
import {
  ActivityData,
  ActivityDateType,
} from "../../../../utility/data/constants";
import DateCard from "../../../ui/atoms/activity/date-card";
import TimeRangePicker from "../../../ui/organisms/TimeRangePicker";
import {
  getLocationHistory,
  resetLocationHistory,
  saveTripLocation,
} from "../../../../redux/actions/locationHistory/locationHistory.action";

import { useSelector, useDispatch } from "react-redux";
import GetLocation from "../../../../utility/location/getLocation";
import { TIME } from "../../../../utility/data/constants";
import NormalInput from "../../../ui/atoms/input/Input";
import AuthButton from "../../../ui/atoms/button/auth.button";
import { LoginValidationSchema } from "../../../../utility/validation/login.validation";
import { SaveTripValidationSchema } from "../../../../utility/validation/save-trip.vaildation";
import { Formik } from "formik";

export default function TripHistory({ navigation }) {
  let cameraRef = useRef();
  let shapeSource = useRef();
  const { min, max } = TIME;
  const { height, width } = Dimensions.get("window");
  const [show, setShow] = useState(false);
  const [timeRange, setTimeRange] = useState([min, max]);
  const [selectedRange, setRange] = useState();
  const [dateType, setDateType] = useState(ActivityDateType.ONE_DAY);
  const [dateValue, setDateValue] = useState(moment());
  const { locationHistoryResponse, saveTripReducer } = useSelector((state) => state);
  const [activityLocations, setActivityLocations] = useState([]);
  const [centerLocation, setCenterLocation] = useState(null);
  const [rangeTimeRange, setRangeTimeRange] = useState([min, max]);
  const [saveTripModal, setSaveTripModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const startDate = moment(dateValue[0]).hour(timeRange[0]);
    const secondDate = moment(dateValue[1]).hour(timeRange[1]);
    getLocationHistory(
      {
        start_date: startDate.toISOString(),
        end_date: secondDate.toISOString(),
      },
      dispatch
    );
    GetLocation.then((res) => {
      setCenterLocation([
        parseFloat(res["coords"]["longitude"]),
        parseFloat(res["coords"]["latitude"]),
      ]);
    }).catch((err) => {});
  }, []);

  useEffect(() => {
    if (dateValue) {
      if (dateType === ActivityDateType.ONE_DAY) {
        const startDate = moment(dateValue[0]).hour(timeRange[0]);
        const secondDate = moment(dateValue[1]).hour(timeRange[1]);
        getLocationHistory(
          { start_date: startDate.toDate(), end_date: secondDate.toDate() },
          dispatch
        );
      } else {
        getLocationHistory(
          { start_date: dateValue[0], end_date: dateValue[1] },
          dispatch
        );
      }
    }
  }, [dateValue, timeRange]);

  useEffect(() => {
    if (selectedRange) {
      const startDate = moment(selectedRange?.firstDate).hour(
        rangeTimeRange[0]
      );
      const secondDate = moment(selectedRange?.firstDate).hour(
        rangeTimeRange[1]
      );
      getLocationHistory(
        { start_date: startDate.toDate(), end_date: secondDate.toDate() },
        dispatch
      );
    }
  }, [rangeTimeRange]);

  useEffect(() => {
    if (locationHistoryResponse.loaded) {
      if (locationHistoryResponse.data.length > 0) {
        if (locationHistoryResponse.data.length < 3) {
          Alert.alert(
            "Not Found",
            "No recorded location found on specified time",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
          );
          setActivityLocations([]);
        } else {
          const arr = locationHistoryResponse.data.map((dat) => [
            parseFloat(dat.longitude),
            parseFloat(dat.latitude),
          ]);
          cameraRef?.current?.setCamera({
            centerCoordinate: arr[Math.floor(arr.length / 2)].map((data) =>
              parseFloat(data)
            ),
            zoomLevel: 13,
            animationDuration: 2000,
          });
          setActivityLocations(arr);
        }
      } else {
        Alert.alert(
          "Not Found",
          "No recorded location found on specified time",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
        setActivityLocations([]);
      }
    } else {
      setActivityLocations([]);
    }
  }, [locationHistoryResponse]);

  useEffect(() => {
    if (saveTripReducer.loaded) {
      if (saveTripReducer.data) {
        setTimeout(() => {setSaveTripModal(false);}, 200)
      }
    }
  }, [saveTripReducer])

  const handleSave = () => {
    if (locationHistoryResponse.data.length < 3) {
      Alert.alert("Not Found", "No recorded location found on specified time", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      setSaveTripModal(true)
    }
  };

  const renderError = () => {
    if (saveTripReducer.loaded) {
      if (saveTripReducer.error) {
        return <Text style={{color: "red", fontWeight: "bold", fontSize: 15}}>Error occured</Text>
      }else {
        return <></>
      }
    }
  }

  console.log("Data >> ", saveTripReducer);

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setShow(!show);
        }}
      >
        <View
          style={{ flex: 1, paddingTop: height / 5.5, paddingHorizontal: 30 }}
        >
          <View
            style={{
              backgroundColor: "#2b2b2b",
              borderRadius: 3,
            }}
          >
            <DateRangePicker
              style={{ backgroundColor: "#2b2b2b", color: "gray" }}
              onSelectDateRange={(range) => {
                setRange(range);
              }}
              blockSingleDateSelection={false}
              responseFormat="YYYY-MM-DD"
              maxDate={moment()}
              minDate={moment().subtract(100, "days")}
              selectedDateContainerStyle={{
                height: 35,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#D764FF",
              }}
              selectedDateStyle={{ fontWeight: "bold", color: "#2b2b2b" }}
            />
            <Button
              title="OK"
              containerStyle={{ backgroundColor: "#D764FF" }}
              onPress={() => {
                if (selectedRange) {
                  const startDate = moment(selectedRange?.firstDate).startOf(
                    "day"
                  );
                  const secondDate = moment(selectedRange?.secondDate).startOf(
                    "day"
                  );
                  getLocationHistory(
                    {
                      start_date: startDate.toISOString(),
                      end_date: secondDate.toISOString(),
                    },
                    dispatch
                  );
                }
                setShow(false);
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={locationHistoryResponse.loading}
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

      <Modal animationType="none" transparent={true} visible={saveTripModal}>
        <View
          style={{
            // flex: 1,
            paddingTop: height / 4,
            padding: 50,
            // alignItems: "center",
            backgroundColor: "transparent"
            // backgroundColor: "#2b2b2b",
          }}
        >
          <View style={{backgroundColor: "#2b2b2b", padding: 10, height: height/4, borderRadius: 10}}>
          <Formik
            initialValues={{ name: "" }}
            validationSchema={SaveTripValidationSchema}
            onSubmit={(values) => {
              if (selectedRange) {
                if (selectedRange?.firstDate === selectedRange?.secondDate) {
                  values.date = `${moment(selectedRange?.firstDate).toISOString()}-${moment(selectedRange?.secondDate).toISOString()}`
                }else {
                  values.date = `${moment(selectedRange?.firstDate).hour(rangeTimeRange[0]).toISOString()}-${moment(selectedRange?.firstDate).hour(rangeTimeRange[1]).toISOString()}`
                }
              }else {
                if (ActivityDateType.ONE_DAY) {
                  const startDate = moment(dateValue[0]).hour(timeRange[0]);
                  const secondDate = moment(dateValue[1]).hour(timeRange[1]);
                  values.date = `${startDate.toISOString()}-${secondDate.toISOString()}`
                }else {
                  values.date = `${dateValue[0]}-${dateValue[1]}`
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
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <NormalInput
                    name="Trip name"
                    value={values.name}
                    onChange={handleChange("name")}
                    label="Name"
                    errorMessage={errors.name}
                  />
                  <View>{renderError()}</View>
                  {saveTripReducer.loaded ? saveTripReducer.data ? <Text style={{fontWeight:"bold", color: "green"}}>Successful</Text> :<></>:<></>}
                  <AuthButton
                    loading={saveTripReducer.loading}
                    label="Save"
                    onClick={handleSubmit}
                  />
                </View>
              );
            }}
          </Formik>
          </View>
        </View>
      </Modal>

      <View style={{ width: width, height: height }}>
        <MapboxGL.MapView
          key={new Date()}
          style={{ flex: 1 }}
          zoomEnabled={true}
          scrollEnabled={true}
          logoEnabled={true}
          styleURL="mapbox://styles/kliq/ckubt5dru3vhb18mq2t54kzf7"
        >
          <MapboxGL.Camera
            ref={cameraRef}
            centerCoordinate={centerLocation}
            zoomLevel={13}
            animationDuration={0}
            followUserLocation={false}
            // centerCoordinate={userLocation}
          />
          <MapboxGL.ShapeSource
            ref={shapeSource}
            id="source1"
            lineMetrics={true}
            clusterMaxZoomLevel={13}
            shape={{
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: activityLocations,
              },
            }}
          >
            <MapboxGL.LineLayer
              id="layer1"
              style={{
                lineColor: "#D764FF",
                lineWidth: 2,
              }}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
      </View>

      <View
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          bottom: 50,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            // height: 50,
            width: "90%",
            backgroundColor: "rgba(51,51,51,0.8)",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignContent: "center" }}>
              <Icon name="globe-outline" size={15} />
              <Text style={{ paddingLeft: 10 }}>Activity in the last</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableWithoutFeedback>
                <Icon
                  name="calendar-outline"
                  size={15}
                  onPress={() => setShow(true)}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
          {selectedRange ? (
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 15,
                  marginBottom: 15,
                  flexDirection: "row",
                }}
              >
                <View>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {selectedRange?.firstDate === selectedRange?.secondDate
                      ? moment(selectedRange?.firstDate).format("MM/DD/YYYY")
                      : `${moment(selectedRange?.firstDate).format(
                          "MM/DD/YY"
                        )} - ${moment(selectedRange?.secondDate).format(
                          "MM/DD/YY"
                        )}`}
                  </Text>
                </View>
                <View style={{ paddingLeft: 15 }}>
                  <Icon
                    name="close-outline"
                    size={30}
                    color={"white"}
                    onPress={() => setRange(null)}
                  />
                </View>
              </View>
              {selectedRange?.firstDate === selectedRange?.secondDate ? (
                <View
                  style={{
                    paddingLeft: 25,
                    paddingRight: 5,
                    paddingBottom: 20,
                  }}
                >
                  <TimeRangePicker
                    timeRange={rangeTimeRange}
                    onChange={(range) => setRangeTimeRange(range)}
                  />
                </View>
              ) : (
                <></>
              )}
            </View>
          ) : (
            <>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  paddingBottom: 10,
                }}
              >
                {ActivityData.map((activity) => (
                  <DateCard
                    selected={dateType}
                    setSelected={setDateType}
                    type={activity.type}
                    title={activity.title}
                    subTitle={activity.subTitle}
                    setSelectedDate={setDateValue}
                    date={activity.date}
                  />
                ))}
              </View>
              {dateType === ActivityDateType.ONE_DAY ? (
                <View
                  style={{
                    paddingLeft: 25,
                    paddingRight: 5,
                    paddingBottom: 20,
                  }}
                >
                  <TimeRangePicker
                    timeRange={timeRange}
                    onChange={(range) => setTimeRange(range)}
                  />
                </View>
              ) : (
                <></>
              )}
            </>
          )}
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          right: 0,
          width: width,
          height: 60,
        }}
      >
        {/* <LinearGradient colors={AppBarGradient}> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Icon name="chevron-back-outline" size={25} />

              <Text
                style={{ paddingLeft: 15, fontWeight: "bold", fontSize: 17 }}
              >
                Trip History
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ paddingLeft: 50 }}>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                backgroundColor: "gray",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableWithoutFeedback onPress={() => navigation.navigate("AddSavedTrip", {selectedRange, rangeTimeRange, dateValue, timeRange})}>
                <Icon
                  style={{ color: "white" }}
                  name="download-outline"
                  size={15}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        {/* </LinearGradient> */}
      </View>
    </SafeAreaView>
  );
}
